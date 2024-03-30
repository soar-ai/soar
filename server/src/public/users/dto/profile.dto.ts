import {
  ApiProperty,
} from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Dto,
} from '../../../lib/dto/Dto';

export class ProfileDto extends Dto<ProfileDto> {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string;
}
