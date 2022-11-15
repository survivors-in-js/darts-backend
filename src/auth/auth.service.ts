import { Injectable, ForbiddenException } from '@nestjs/common';
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
    return await bcrypt.compare(password, user.password).then((matched) => {
      if (user) {
        return user;
      }
      if (!matched) {
        throw new ForbiddenException();
      }
    });
  }
}
