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
  UsePipes,
} from '@nestjs/common';
import { TestService } from './test.service';
import { FindTestDto } from './dto/find-test.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { BusyCheckDto } from './dto/busy-check.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidatePagerPipe } from './pipes/validate-pager.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Test } from './entities/test.entitie';

@ApiTags('tests')
@UseGuards(AuthGuard('jwt'), RolesGuard, ThrottlerGuard)
// @UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
// @UseFilters(HttpExceptionFilter) // можно и отдельно на метод/маршрут  // можно сделать глобальный фильтр через app. (там пример)
@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @ApiResponse({ type: [Test] })
  @UsePipes(new ValidatePagerPipe('page', 'perPage'))
  async find(
    @Query(new ValidationPipe()) query: FindTestDto,
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    // @Query('perPage', new DefaultValuePipe(200), ParseIntPipe) perPage: number
  ) {
    const tests = await this.testService.find({}, {}, query.page, query.perPage);
    
    return { data: tests };
  }

  @Post()
  @ApiResponse({ type: Test })
  async create(@Body(new ValidationPipe()) createTestDto: CreateTestDto) {
    return await this.testService.create(createTestDto);
  }

  @Put(':id')
  @ApiResponse({ type: Test })
  @Roles('admin')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateTestDto: UpdateTestDto) {
    return await this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    const res = await this.testService.delete(id);

    if (res !== HttpStatus.OK) {
      throw new HttpException('Error', res);
    } else {
      // throw new HttpException('Success', res);
      return { message: 'Success', status: 200 };
    }
  }

  @Get('/busy')
  @ApiResponse({ description: 'string | boolean' })
  async busy(@Query(new ValidationPipe()) busyCheckDto: BusyCheckDto) {
    return await this.testService.busy(busyCheckDto.key, busyCheckDto.value);
  }
}
