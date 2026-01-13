import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type JoinMatchDto = {
  matchId: string;
};

@WebSocketGateway({
  cors: {
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  },
  transports: ['websocket'],
})
export class RealtimeGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;
  private socketUser = new Map<string, { userId: string | null }>();

  private roomMatch(matchId: string) {
    return `match: ${matchId}`;
  }

  handleDisconnect(client: Socket) {
    const token = (client.handshake.auth?.token as string | undefined) ?? null;
    const userId = token ? `user:${token.slice(0, 8)}` : null;
    this.socketUser.set(client.id, { userId });
    client.emit('conn:ready', {
      socketId: client.id,
      userId,
    });
  }
  handleConnection(client: Socket) {
    this.socketUser.delete(client.id);
  }

  @SubscribeMessage('match:ping')
  onPing(@ConnectedSocket() client: Socket) {
    client.emit('match:pong', {
      t: Date.now(),
    });
  }

  @SubscribeMessage('match:join')
  async onJoinMatch(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: JoinMatchDto,
  ) {
    if (!body?.matchId) {
      client.emit('match:error', {
        message: 'Match Id is required',
      });
      return;
    }
    const room = this.roomMatch(body.matchId);
    await client.join(room);
    const state = {
      matchId: body.matchId,
      turn: 1,
      phase: 'MULLIGAN',
      players: [],
    };
    client.emit('match:joined', { matchId: body.matchId });
    client.emit('match:state', state);

    //broadcast cho room
    client.to(room).emit('match:peer-joined', {
      socketId: client.id,
      userId: this.socketUser.get(client.id)?.userId ?? null,
    });
  }
  @SubscribeMessage('match:leave')
  async onLeaveMatch(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: JoinMatchDto,
  ) {
    if (!body?.matchId) return;
    const room = this.roomMatch(body.matchId);
    await client.leave(room);
    client.emit('match:left', {
      matchId: body.matchId,
    });
  }
}
