import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  JwtService,
} from '@nestjs/jwt';
import type {
  User,
} from '@prisma/client';
import type {
  CreateUserDto,
} from 'src/public/users/dto/createUser.dto';
import {
  AuthUserDto,
} from '../public/users/dto/authUser.dto';
import {
  UsersService,
} from '../public/users/users.service';
import {
  LoginResDto,
} from './dto/loginRes.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    const authUser = new AuthUserDto({
      id: user.id,
      firstname: user.firstname ?? '',
      email: user.email,
      avatar: user.avatar ?? '',
    });

    return new LoginResDto({
      user: { ...authUser },
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '60d',
      }),
    });
  }

  async localLogin(email: string) {
    const user = await this.userService.findOneWithEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    return this.login(user);
  }

  async createUser(data: CreateUserDto) {
    const user = await this.userService.create(data);

    if (!user.id) {
      throw new InternalServerErrorException('User not created');
    }

    return this.login(user);
  }

  refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerOrLoginWithApple(jwt: string) {
    const data = this.jwtService.decode(jwt, { json: true });

    if (!data.email) {
      throw new UnauthorizedException('Invalid JWT');
    }

    if (data.aud !== 'ai.soarapp.soar') {
      throw new UnauthorizedException('Invalid JWT');
    }

    const existingUser = await this.userService.findOneWithEmail(data.email);

    if (existingUser) {
      return this.login(existingUser);
    }
    return this.createUser({
      email: data.email,
    });
  }
}
