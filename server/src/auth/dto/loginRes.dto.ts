import {
  ApiProperty,
} from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';
import {
  Dto,
} from '../../lib/dto/Dto';
import {
  AuthUserDto,
} from '../../public/users/dto/authUser.dto';

export class LoginResDto extends Dto<LoginResDto> {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}
