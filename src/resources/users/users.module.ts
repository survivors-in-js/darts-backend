import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/emailsender/emailsender.module';
import { RolesGuard } from '../../auth/guards/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard],
  exports: [UsersService],
})
export class UsersModule {}
