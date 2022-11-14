import { IsEmail, IsNotEmpty } from 'class-validator';
import Role from '../../../config/role.enum';
export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;

  public role: Role;
}
