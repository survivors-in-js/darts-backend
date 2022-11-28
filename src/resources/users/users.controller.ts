import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Roles } from '../../auth/roles.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailSender } from 'src/emailsender/emailsender.service';
import { RestoreUserPasswordDto } from './dto/restore-user-password.dto';

import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import * as bcrypt from 'bcrypt';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { User } from './entities/user.entity';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { RoleEnum } from 'src/config/role.enum';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailSender,
  ) {}

  @Roles(RoleEnum.SUPER_ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Roles(RoleEnum.SUPER_ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  public updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  public getUser(@Req() req): Promise<User> {
    return this.usersService.findOne(parseInt(req.user.id));
  }

  @Roles(RoleEnum.SUPER_ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  public updateAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(parseInt(id), updateUserDto);
  }

  @Roles(RoleEnum.SUPER_ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(parseInt(id));
  }

  @Roles(RoleEnum.SUPER_ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<any> {
    const userBase = await this.findOne(id);
    if (userBase.role !== RoleEnum.SUPER_ADMIN) {
      return this.usersService.remove(parseInt(id));
    } else
      throw new UnauthorizedException('Нельзя удалить Супер-Администратора');
  }

  @Post('/forget-password')
  public async restore(
    @Body() restoreUserPasswordDto: RestoreUserPasswordDto,
  ): Promise<string> {
    const { email } = restoreUserPasswordDto;
    const user = await this.usersService.findWithOptions(
      { email },
      { id: true, email: true },
    );
    if (!user) {
      throw new NotFoundException();
    }
    const newPassword = Math.random().toString(36).slice(-8);
    try {
      await this.usersService.updateUser(user.id, {
        password: newPassword,
        email: email,
      });
      this.emailService.sendemail(email, `Ваш новый пароль:${newPassword}`);
      return 'Новый пароль отправлен на вашу почту';
    } catch (err) {
      return 'Произошла ошибка при обновлении данных';
    }
  }

  @UseGuards(JwtGuard)
  @Post('/change-password')
  public async change(
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
    @Req() req,
  ): Promise<string> {
    const { password, newPassword, newPasswordRepeat } = changeUserPasswordDto;
    const user = await this.usersService.findWithOptions({
      email: req.user.email,
    });
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new ForbiddenException('Введены неверные данные');
    }
    if (newPassword !== newPasswordRepeat) {
      throw new ConflictException('Новый пароль введен с ошибкой');
    }
    await this.usersService.updateUser(req.user.id, {
      password: newPassword,
      email: req.user.email,
    });
    return 'Пароль успешно изменен';
  }
}
