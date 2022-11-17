import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RestoreUserPasswordDto extends PartialType(CreateUserDto) {
  @IsEmail()
  public email: string;
}
