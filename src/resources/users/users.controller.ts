import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from '../../auth/roles.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { UpdateAdminDto } from './dto/update-admin-dto';
import { UpdateRoleDto } from './dto/update-role-dto';
import Role from '../../config/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  public findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  public updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  public getUser(@Req() req): Promise<any> {
    return this.usersService.findOne(parseInt(req.user.id));
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id/role')
  public updateSuperAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateRoleDto,
  ): Promise<any> {
    return this.usersService.updateRole(parseInt(id), updateUserDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id/udate-password')
  public async resetPassword(
    @Param('id') id: string,
    @Body() updateUserDto: any,
  ): Promise<any> {
    const userBase = await this.findOne(id);
    if (userBase.role !== Role.SUPER_ADMIN) {
      return this.usersService.resetPassword(parseInt(id), updateUserDto);
    } else
      throw new UnauthorizedException(
        'Нельзя изменить пароль обратитесь к системному администратору',
      );
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  public updateAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: any,
  ): Promise<any> {
    return this.usersService.updateUser(parseInt(id), updateUserDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<any> {
    return this.usersService.findOne(parseInt(id));
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<any> {
    const userBase = await this.findOne(id);
    if (userBase.role !== Role.SUPER_ADMIN) {
      return this.usersService.remove(parseInt(id));
    } else
      throw new UnauthorizedException('Нельзя удалить Супер-Администратора');
  }
}
