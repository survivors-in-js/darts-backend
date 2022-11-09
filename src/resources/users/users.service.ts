import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
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

  public findAll(): Promise<any> {
    return this.userRepository.find({
      where: {},
      select: { id: true, email: true },
    });
  }

  public findOne(id: number): Promise<any> {
    return this.userRepository.findOne({
      where: { id },
      select: { id: true, email: true },
    });
  }

  public async update(id: number, user: UpdateUserDto): Promise<any> {
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
