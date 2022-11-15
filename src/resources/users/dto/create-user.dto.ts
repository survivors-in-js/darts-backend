import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEnum } from 'src/config/role.enum';
export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;

  public role: RoleEnum;
}
