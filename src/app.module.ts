import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './emailsender/emailsender.module';
import { ConfigModule } from '@nestjs/config';
import configs from './config/config';
import { ParticipantsModule } from './resources/participants/participants.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { UsersModule } from './resources/users/users.module';
import { User } from './resources/users/entities/user.entity';
import { Participant } from './resources/participants/entities/participant.entity';
import { AuthModule } from './auth/auth.module';
import { Event } from './resources/events/entities/event.entity';
import { EventsModule } from './resources/events/events.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configs().database.host,
      port: configs().database.port,
      username: configs().database.username,
      password: configs().database.password,
      database: configs().database.databaseName,
      entities: [User, Participant, Event],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      load: [configs],
    }),
    ParticipantsModule,
    FilesModule,
    UsersModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
