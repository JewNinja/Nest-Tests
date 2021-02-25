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
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { FindTestDto } from './dto/find-test.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { BusyCheckDto } from './dto/busy-check.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body(new ValidationPipe()) createTestDto: CreateTestDto) {
    return await this.testService.create(createTestDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateTestDto: UpdateTestDto) {
    return await this.testService.update(id, updateTestDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const res = await this.testService.delete(id);

    if (res !== HttpStatus.OK) {
      throw new HttpException('Error', res);
    } else {
      // throw new HttpException('Success', res);
      return { message: 'Success', status: 200 };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/busy')
  async busy(@Query(new ValidationPipe()) busyCheckDto: BusyCheckDto) {
    return await this.testService.busy(busyCheckDto.key, busyCheckDto.value);
  }
}
