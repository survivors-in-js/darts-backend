import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../resources/users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from '../resources/users/dto/create-user.dto';
import { CreateAdminDto } from '../resources/users/dto/create-admin.dto';

@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req) {
    return await this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }

  @Post('addAdmin')
  async addAdmin(@Body() createUserDto: CreateAdminDto) {
    if (createUserDto.email === 'superAdmin@test.ru') {
      const user = await this.usersService.createAdmin(createUserDto);
      return this.authService.auth(user);
    } else throw new UnauthorizedException('Неправильно');
  }
}
