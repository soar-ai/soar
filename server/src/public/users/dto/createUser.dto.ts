import {
  ApiProperty,
} from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';
import {
  Dto,
} from '../../../lib/dto/Dto';

export class CreateUserDto extends Dto<CreateUserDto> {
  @ApiProperty()
  @IsString()
  email: string;
}
