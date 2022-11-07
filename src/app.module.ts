import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configs from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configs().database.host,
      port: configs().database.port,
      username: configs().database.username,
      password: configs().database.password,
      database: configs().database.databaseName,
      entities: [],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: [configs],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
