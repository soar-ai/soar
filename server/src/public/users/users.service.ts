import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaService,
} from '../../prisma.service';
import {
  AuthUserDto,
} from './dto/authUser.dto';
import type {
  CreateUserDto,
} from './dto/createUser.dto';
import {
  ProfileDto,
} from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: string) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new AuthUserDto({
      email: user.email,
      firstname: user.firstname ?? '',
      id: user.id,
      avatar: user.avatar ?? '',
    });
  }

  findOneWithEmail(username: string) {
    return this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
      },
    });
  }

  async updateFirstname(firstname: string, userId: string) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstname,
      },
    });

    return new AuthUserDto({
      email: user.email,
      firstname: user.firstname ?? '',
      id: user.id,
      avatar: user.avatar ?? '',
    });
  }

  async updateUserAvatar(avatar: string, userId: string) {
    const res = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar,
      },
    });

    return new ProfileDto({
      id: res.id,
      firstname: res.firstname ?? '',
      avatar: res.avatar ?? '',
    });
  }
}
