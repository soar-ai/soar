import {
  Module,
} from '@nestjs/common';
import {
  ConfigModule,
} from '@nestjs/config';
import {
  APP_GUARD,
} from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerModule,
} from '@nestjs/throttler';
import {
  AuthModule,
} from './auth/auth.module';
import {
  UsersModule,
} from './public/users/users.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
