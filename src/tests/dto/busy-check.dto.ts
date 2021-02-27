import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BusyCheckDto {
  @IsString()
  @ApiProperty()
  key: string;
  @IsString()
  @ApiProperty()
  value: string;
}
