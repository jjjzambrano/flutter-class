import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateInformationTeacherDto,
  FilterInformationTeacherDto,
  UpdateInformationTeacherDto,
} from '@core/dto';
import { InformationTeacherEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';
import { InformationTeachersService } from '@core/services';

@ApiTags('Information Teachers')
@Controller('information-teachers')
export class InformationTeachersController {
  constructor(private informationTeachersService: InformationTeachersService) {}

  @ApiOperation({ summary: 'Create Information Teacher' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateInformationTeacherDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Information Teacher Created',
      title: 'Information Teacher Created',
    };
  }

  @ApiOperation({ summary: 'Find All Information Teachers' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterInformationTeacherDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.findAll(
      params,
    );
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find All Information Teachers',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Information Teacher' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'FInd Information Teacher',
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update Information Teacher' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInformationTeacherDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'The information teacher was updated',
      title: `Information Teacher Updated`,
    };
  }

  @ApiOperation({ summary: 'Delete Information Teacher' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.remove(id);

    return {
      data: serviceResponse.data,
      message: `The information teacher was deleted`,
      title: `Information Teacher Deleted`,
    };
  }

  @ApiOperation({ summary: 'Delete All Information Teachers' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InformationTeacherEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationTeachersService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `The information teachers was deleted`,
      title: `Information Teachers Deleted`,
    };
  }
}
