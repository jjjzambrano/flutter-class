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
  CreateInformationStudentDto,
  FilterInformationStudentDto,
  UpdateInformationStudentDto,
} from '@core/dto';
import { InformationStudentEntity } from '@core/entities';
import { InformationStudentsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Information-students')
@Controller('information-students')
export class InformationStudentsController {
  constructor(private informationstudentsService: InformationStudentsService) {}

  @ApiOperation({ summary: 'Create information students' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationstudentsService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'List of information students' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationstudentsService.findAll(
      params,
    );
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'View one information students' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationstudentsService.findOne(id);
    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update information students' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationstudentsService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Information Student  updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove information students' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationstudentsService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Information Student deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All Information Students' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InformationStudentEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationstudentsService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Information Students deleted`,
      title: `Deleted`,
    };
  }
}
