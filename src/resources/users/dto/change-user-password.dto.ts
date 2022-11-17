import { IsNotEmpty } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public newPassword: string;

  @IsNotEmpty()
  public newPasswordRepeat: string;
}
