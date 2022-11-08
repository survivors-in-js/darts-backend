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
  async create(createUserDto: CreateUserDto) {
    const { password, ...res } = createUserDto;
    return await bcrypt.hash(password, 10).then((hash) =>
      this.userRepository.save({
        password: hash,
        ...res,
      }),
    );
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, user: UpdateUserDto) {
    await this.userRepository.update(id, user);
    return user;
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
  }
}
