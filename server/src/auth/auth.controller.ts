import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
} from '../public/users/dto/createUser.dto';
import {
  AuthService,
} from './auth.service';
import {
  RefreshJwtGuard,
} from './guards/refresh-jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('devLogin')
  async devLogin(@Body() createUserDto: CreateUserDto) {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('This endpoint is only available in development mode');
    }
    return this.authService.localLogin(createUserDto.email);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @Post('registerOrLoginWithApple')
  async registerOrLoginWithApple(@Body() { jwt }: { jwt: string; }) {
    return this.authService.registerOrLoginWithApple(jwt);
  }
}
