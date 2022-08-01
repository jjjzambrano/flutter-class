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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateInstitutionDto,
  FilterInstitutionDto,
  UpdateInstitutionDto,
} from '@core/dto';
import { InstitutionEntity } from '@core/entities';
import { InstitutionsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private instituteService: InstitutionsService) {}

  @ApiOperation({ summary: 'Create Institution' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateInstitutionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.create(payload);
    return {
      data: serviceResponse.data,
      message: `Institution was created`,
      title: 'Institution Created',
    };
  }

  @ApiOperation({ summary: 'Find All Institutions' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterInstitutionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Find all institutions`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Institution' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.findOne(id);
    return {
      data: serviceResponse.data,
      message: 'Find Institution',
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update Institution' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInstitutionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: 'Institution was updated',
      title: `Institution Updated`,
    };
  }

  @ApiOperation({ summary: 'Delete Institution' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.remove(id);
    return {
      data: serviceResponse.data,
      message: 'Institution was deleted',
      title: 'Institution Deleted',
    };
  }

  @ApiOperation({ summary: 'Delete All Institutions' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InstitutionEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.instituteService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: 'Institutions was deleted',
      title: 'Institutions Deleted',
    };
  }
}
