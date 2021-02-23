import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  ValidationPipe,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TestService } from './test.service';
import { FindTestDto } from './dto/find-test.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { BusyCheckDto } from './dto/busy-check.dto';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async find(@Query(new ValidationPipe()) query: FindTestDto) {
    const tests = await this.testService.find(
      {},
      {},
      +query.page, // TODO: разобраться с этой хернёй
      +query.perPage,
    );
    return { data: tests };
  }

  @Post()
  async create(@Body(new ValidationPipe()) createTestDto: CreateTestDto) {
    debugger;
    const res = await this.testService.create(createTestDto);
    debugger;
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateTestDto: UpdateTestDto) {
    debugger;
    const res = await this.testService.update(id, updateTestDto);
    debugger;
    return res;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    debugger;
    const res = await this.testService.delete(id);
    debugger;
    if (res !== HttpStatus.OK) {
      throw new HttpException('Error', res);
    } else {
      // throw new HttpException('Success', res);
      return { message: 'Success', status: 200 };
    }
  }

  @Get('/busy')
  async busy(@Query(new ValidationPipe()) busyCheckDto: BusyCheckDto) {
    debugger;
    const res = await this.testService.busy(busyCheckDto.key, busyCheckDto.value);
    debugger;
    return res;
  }
}
