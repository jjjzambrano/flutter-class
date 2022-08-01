import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  UpdateCurriculumDto,
  CreateCurriculumDto,
  FilterCurriculumDto,
} from '@core/dto';
import { CurriculumEntity } from '@core/entities';
import { CurriculaService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Curricula')
@Controller('curricula')
export class CurriculaController {
  constructor(private curriculaService: CurriculaService) {}

  @ApiOperation({ summary: 'Create Curriculum' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCurriculumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'The curriculum was created',
      title: 'Curriculum Created',
    };
  }

  @ApiOperation({ summary: 'Find All Curricula' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterCurriculumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all curricula',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Curriculum' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Find curriculum',
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update Curriculum' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCurriculumDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'The curriculum was updated',
      title: 'Curriculum Updated',
    };
  }

  @ApiOperation({ summary: 'Delete Curriculum' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.remove(id);

    return {
      data: serviceResponse.data,
      message: 'The curriculum was deleted',
      title: `Curriculum Deleted`,
    };
  }

  @ApiOperation({ summary: 'Delete All Curricula' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CurriculumEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.curriculaService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: 'The curricula was deleted',
      title: 'Curricula Deleted',
    };
  }
}
