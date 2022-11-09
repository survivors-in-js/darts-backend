import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  public create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtGuard)
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
}
