import { IsEmail, IsNotEmpty } from 'class-validator';
import Role from '../../../config/role.enum';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  role: Role;
}
