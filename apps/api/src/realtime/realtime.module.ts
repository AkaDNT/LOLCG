import { Module } from '@nestjs/common';
import { RealtimeGateWay } from './realtime.gateway';

@Module({
  providers: [RealtimeGateWay],
})
export class RealtimeModule {}
