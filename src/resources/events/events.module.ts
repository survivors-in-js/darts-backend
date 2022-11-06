import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

/* 
- в случае, если указанная почта записана в бд, то на эту почту должен быть направлен временный сгенерированный пароль;
- в случае, если указанная почта не записана в бд, то пользователь должен получить уведомление о том, что такой почты нет в списке. */
