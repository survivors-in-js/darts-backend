import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configs from './config/config';
import { ParticipantsModule } from './resources/participants/participants.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configs().database.host,
      port: configs().database.port,
      username: configs().database.username,
      password: configs().database.password,
      database: configs().database.databaseName,
      entities: configs().database.entities,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
