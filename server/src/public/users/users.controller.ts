import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import {
  JwtGuard,
} from '../../auth/guards/jwt-auth.guard';
import {
  ReqUser,
  ReqUserType,
} from '../../auth/util/user.decorator';
import type {
  AuthUserDto,
} from './dto/authUser.dto';
import {
  UsersService,
} from './users.service';

@ApiTags('users')
@Controller('user')
export class UsersController {
  logger: Logger;

  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('info')
  async getUser(@ReqUser() user: ReqUserType): Promise<AuthUserDto> {
    return this.usersService.getUser(user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch('firstname')
  async updateUserFirstName(
    @Body() { firstname }: { firstname: string; },
    @ReqUser() user: ReqUserType,
  ) {
    return this.usersService.updateFirstname(firstname, user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch('lastname')
  async updateUserLastName(
    @Body() { firstname }: { firstname: string; },
    @ReqUser() user: ReqUserType,
  ) {
    return this.usersService.updateFirstname(firstname, user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch('avatar')
  async updateUserAvatar(
    @Body() { avatar }: { avatar: string; },
    @ReqUser() user: ReqUserType,
  ) {
    return this.usersService.updateUserAvatar(avatar, user.userId.id);
  }
}
