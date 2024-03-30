import {
  Module,
} from '@nestjs/common';
import {
  JwtModule,
} from '@nestjs/jwt';
import {
  PrismaService,
} from '../prisma.service';
import {
  UsersService,
} from '../public/users/users.service';
import {
  AuthController,
} from './auth.controller';
import {
  AuthService,
} from './auth.service';
import {
  JwtStrategy,
} from './strategies/jwt.strategy';
import {
  RefreshJwtStrategy,
} from './strategies/refreshToken.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
})
export class AuthModule {}
