import { Controller, Get } from '@nestjs/common';

@Controller('tests')
export class TestsController {
  @Get('')
  findAll(): any {
    console.log('453');
    return { data: 'This action returns all cats' };
    // return 'This action returns all cats';
  }
}
