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
} from '@nestjs/common';
import { Roles } from './../auth/roles.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UpdateAdminDto } from './dto/update-admin-dto';
import { UpdateRoleDto } from './dto/update-role-dto';
import Role from '../../config/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Перенёс в auth до согласования
  /*
  @Post('signup')
  public create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }*/

  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  public findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Patch('update')
  public updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  public getUser(@Req() req): Promise<any> {
    return this.usersService.findOneUser(parseInt(req.user.id));
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id/role')
  public updateSuperAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateRoleDto,
  ): Promise<any> {
    return this.usersService.updateRole(parseInt(id), updateUserDto);
  }
  /* Пока под вопросом. Непонятно будет ли у 
  администраторов возможность менять email и 
  сбрасывать пароль у пользователей или нет.
  */
  /*
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  public updateAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateAdminDto,
  ): Promise<any> {
    return this.usersService.updateUser(parseInt(id), updateUserDto);
  }*/

  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<any> {
    return this.usersService.findOne(parseInt(id));
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  public remove(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(parseInt(id));
  }
}
