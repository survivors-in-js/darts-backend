import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../resources/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../resources/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public auth(user: User): { access_token: string } {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Неверная почта или пароль');
    }
    return await bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedException('Неверная почта или пароль');
      }
      return user;
    });
  }
}
