import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(token?: string) {
  if (socket) return socket;

  socket = io(process.env.NEXT_PUBLIC_API_URL, {
    transports: ["websocket"],
    autoConnect: false,
    auth: token ? { token } : undefined,
  });

  return socket;
}

export function connectSocket(token?: string) {
  const s = getSocket(token);
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
