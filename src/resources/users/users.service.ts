import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'src/config/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(
    createUserDto: CreateUserDto,
    isCreatingBySuperAdmin = false,
  ): Promise<User> {
    const { password, email, role } = createUserDto;
    await bcrypt.hash(password, 10).then((hash) =>
      this.userRepository.save({
        password: hash,
        email: email,
        role: isCreatingBySuperAdmin && role ? role : RoleEnum.USER,
      }),
    );
    return await this.findByEmail(email);
  }

  public async createSuperAdmin(createUserDto: CreateUserDto): Promise<User> {
    const { password, email } = createUserDto;
    await bcrypt.hash(password, 10).then((hash) =>
      this.userRepository.save({
        password: hash,
        email: email,
        role: RoleEnum.SUPER_ADMIN,
      }),
    );
    return await this.findByEmail(email);
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: {},
      select: { id: true, email: true, role: true },
    });
  }

  public findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      select: { id: true, email: true, role: true },
    });
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { password } = updateUserDto;
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10).then((hash) => hash);
      this.userRepository.update(id, {
        ...updateUserDto,
        password: passwordHash,
      });
    } else {
      this.userRepository.update(id, updateUserDto);
    }

    return await this.userRepository.findOne({
      where: { id },
      select: { id: true, email: true },
    });
  }

  public async updateRole(id: number, user: UpdateUserDto): Promise<User> {
    const { role, ...res } = user;
    await this.userRepository.update(id, {
      role: role,
    });
    return await this.findOne(id);
  }

  // гоша твой выход. твой тикет. делай што хочешь
  public async resetPassword(id: number, user: UpdateUserDto): Promise<User> {
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
