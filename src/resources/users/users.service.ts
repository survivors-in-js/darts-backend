import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  [x: string]: any;
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

  public findWithOptions(options: { [key in any]: any }, conditions?: any) {
    return this.userRepository.findOne({
      where: options,
      select: conditions,
    });
  }

  public findOne(id: number): Promise<any> {
    return this.userRepository.findOne({
      where: { id },
      select: { id: true, email: true },
    });
  }

  public async update(id: number, user: UpdateUserDto): Promise<any> {
    await this.userRepository.update(id, user);
    return user;
  }

  public async remove(id: number): Promise<any> {
    await this.userRepository.delete({ id });
    return 'Пользователь удалён';
  }
}
