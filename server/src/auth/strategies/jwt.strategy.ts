import {
  PassportStrategy,
} from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
