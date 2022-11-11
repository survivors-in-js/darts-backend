import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailSender } from 'src/emailsender/emailsender.service';
import { RestoreUserPasswordDto } from './dto/restore-user-password.dto';

import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailSender,
  ) {}

  @Post('signup')
  public create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  public findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<any> {
    return this.usersService.findOne(parseInt(id));
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.usersService.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(parseInt(id));
  }
  /// восстановление пароля
  @Post('password/restore')
  public async restore(
    @Body() restoreUserPasswordDto: RestoreUserPasswordDto,
  ): Promise<string> {
    const { email } = restoreUserPasswordDto;
    const user = await this.usersService.findWithOptions(
      { email: email },
      { id: true, email: true },
    );
    if (!user) {
      throw new NotFoundException();
    }
    const newPassword = Math.random().toString(36).slice(-8);
    try {
      await this.usersService.update(user.id, {
        password: newPassword,
        email: email,
      });
      this.emailService.sendemail(email, `Ваш новый пароль:${newPassword}`);
      return 'Новый пароль отправлен на вашу почту';
    } catch (err) {
      return 'Произошла ошибка при обновлении данных';
    }
  }

  /// изменение пароля
  ///пока здесь захардкожен юзер
  @Post('password/change')
  public async change(
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ): Promise<any> {
    const { password, newPassword, newPasswordRepeat } = changeUserPasswordDto;
    const user = {
      id: 1,
      email: 'trubacheff_91@mail.ru',
      password: 't091jqof',
    };
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Введены неверные данные`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (newPassword !== newPasswordRepeat) {
      return new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `Новый пароль введен с ошибкой`,
        },
        HttpStatus.CONFLICT,
      );
    }
    await this.usersService.update(user.id, {
      password: newPassword,
      email: user.email,
    });
    return 'Пароль успешно изменен';
  }
}
