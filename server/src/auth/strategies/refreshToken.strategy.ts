import {
  PassportStrategy,
} from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
