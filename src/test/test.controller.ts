import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { TestService } from './test.service';
import { FindTestDto } from './dto/find-test.dto';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async find(@Query(ValidationPipe) query: FindTestDto) {
    const tests = await this.testService.find({}, {}, +query.page, +query.perPage);
    return { data: tests };
  }
}
