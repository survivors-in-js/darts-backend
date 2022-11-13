import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import Role from '../../config/role.enum';
import { UpdateAdminDto } from './dto/update-admin-dto';
import { UpdateRoleDto } from './dto/update-role-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<any> {
    const { password, email } = createUserDto;
    await bcrypt.hash(password, 10).then((hash) =>
      this.userRepository.save({
        password: hash,
        email: email,
      }),
    );
    return await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true },
    });
  }

  public async createAdmin(createUserDto: CreateUserDto): Promise<any> {
    const { password, email } = createUserDto;
    await bcrypt.hash(password, 10).then((hash) =>
      this.userRepository.save({
        password: hash,
        email: email,
        role: Role.SUPER_ADMIN,
      }),
    );
    return await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true },
    });
  }

  public findAll(): Promise<any> {
    return this.userRepository.find({
      where: {},
      select: { id: true, email: true, role: true },
    });
  }

  public findOne(id: number): Promise<any> {
    return this.userRepository.findOne({
      where: { id },
      select: { id: true, email: true, role: true },
    });
  }

  public async updateUser(id: number, user: UpdateUserDto): Promise<any> {
    const { password, email } = user;
    await bcrypt.hash(password, 10).then((hash) =>
      this.userRepository.update(id, {
        password: hash,
        email: email,
      }),
    );
    return await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true },
    });
  }

  public async updateRole(id: number, user: UpdateRoleDto): Promise<any> {
    const { role, ...res } = user;
    await this.userRepository.update(id, {
      role: role,
    });
    return await this.findOne(id);
  }

  public async update(id: number, user: any): Promise<any> {
    const { email, ...res } = user;
    await this.userRepository.update(id, {
      email: email,
    });
    return await this.findOne(id);
  }

  public async resetPassword(id: number, user: any): Promise<any> {
    const { password } = user;
    await bcrypt.hash(password, 10).then((hash) =>
      this.userRepository.update(id, {
        password: hash,
      }),
    );
    return await this.findOne(id);
  }

  public async remove(id: number): Promise<any> {
    await this.userRepository.delete({ id });
    return 'Пользователь удалён';
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }
}
