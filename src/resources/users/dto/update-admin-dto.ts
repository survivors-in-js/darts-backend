import { UpdateUserDto } from './update-user.dto';
import Role from '../../../config/role.enum';
export class UpdateAdminDto extends UpdateUserDto {
  role: Role;
}
