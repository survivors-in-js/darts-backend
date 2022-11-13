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
import configs from '../config/config';

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
  async addAdmin(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.email === configs().emailSuperAdmin) {
      const user = await this.usersService.createAdmin(createUserDto);
      return this.authService.auth(user);
    } else throw new UnauthorizedException('Неправильно');
  }
}
