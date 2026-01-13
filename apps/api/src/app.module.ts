import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealtimeModule } from './realtime/realtime.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [RealtimeModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
