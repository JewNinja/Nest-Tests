import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindTestDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'number > 0' })
  page: number;
  
  @IsNumber()
  @ApiProperty({ example: 200, description: 'number > 0' })
  perPage: number;
}
