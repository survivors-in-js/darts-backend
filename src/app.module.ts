import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configs from './config/config';
import { UsersModule } from './resources/users/users.module';
import { User } from './resources/users/entities/user.entity';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configs().database.host,
      port: configs().database.port,
      username: configs().database.username,
      password: configs().database.password,
      database: configs().database.databaseName,
      entities: [User],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: [configs],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
