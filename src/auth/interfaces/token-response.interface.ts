import { ApiProperty } from "@nestjs/swagger";

export class ITokenResponse {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
  @ApiProperty()
  expiresIn: string;
}
