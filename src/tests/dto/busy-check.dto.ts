import { IsString } from 'class-validator';

export class BusyCheckDto {
  @IsString()
  key: string;
  @IsString()
  value: string;
}
