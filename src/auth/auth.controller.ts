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
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  public signin(@Req() req): { access_token: string } {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  public async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }

  // супер админ создается по конкретному емаил. тянется из env переменной SUPER_ADMIN_USER. дефолтный superadmin@test.ru
  @Post('add-super-admin')
  public async addSuperAdmin(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    if (createUserDto.email === configs().emailSuperAdmin) {
      const user = await this.usersService.createSuperAdmin(createUserDto);
      return this.authService.auth(user);
    }
    throw new UnauthorizedException('Неправильно');
  }
}
