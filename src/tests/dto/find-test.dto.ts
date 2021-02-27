import { ApiProperty } from '@nestjs/swagger';

export class FindTestDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  perPage: number;
}
