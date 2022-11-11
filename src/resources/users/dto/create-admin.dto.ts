import { CreateUserDto } from './create-user.dto';
import Role from '../../../config/role.enum';
export class CreateAdminDto extends CreateUserDto {
  role: Role;
}
