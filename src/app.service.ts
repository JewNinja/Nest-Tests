import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // constructor(private readonly configServise: ConfigService) {
  //   const mongoConnectionStr = this.configServise.get<string>(
  //     'MONGODB_WRITE_CONNECTION_STRING',
  //   );
  //   console.log('MONGODB_WRITE_CONNECTION_STRING:' + mongoConnectionStr);
  // }
  // getHello(): string {
  //   return 'Hello World!';
  // }
}
