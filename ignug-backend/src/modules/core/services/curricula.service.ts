import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import {
  CreateCurriculumDto,
  UpdateCurriculumDto,
  FilterCurriculumDto,
  PaginationDto,
} from '@core/dto';
import { CurriculumEntity } from '@core/entities';
import { CareersService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CurriculaService {
  constructor(
    @Inject(RepositoryEnum.CURRICULUM_REPOSITORY)
    private curriculumRepository: Repository<CurriculumEntity>,
    private careerService: CareersService,
    private catalogueService: CataloguesService,
  ) {}

  async create(
    payload: CreateCurriculumDto,
  ): Promise<ServiceResponseHttpModel> {
    const newCurriculum = this.curriculumRepository.create(payload);
    newCurriculum.career = await this.careerService.findOne(payload.career.id);
    newCurriculum.state = await this.catalogueService.findOne(payload.state.id);
    const curriculumCreated = await this.curriculumRepository.save(
      newCurriculum,
    );
    return {
      data: curriculumCreated,
    };
  }

  async findAll(
    params: FilterCurriculumDto,
  ): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params.limit && params.page)
      return await this.paginateAndFilter(params);

    // Other filters
    if (params.weeksNumber)
      return await this.filterByWeeksNumber(params.weeksNumber);

    //All
    const data = await this.curriculumRepository.findAndCount({
      relations: ['career', 'state'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<any> {
    const curriculum = await this.curriculumRepository.findOne({
      relations: ['career', 'state'],
      where: {
        id,
      },
    });

    if (!curriculum) {
      throw new NotFoundException('El producto no se encontro');
    }
    return curriculum;
  }

  async update(
    id: number,
    payload: UpdateCurriculumDto,
  ): Promise<ServiceResponseHttpModel> {
    const curriculum = await this.curriculumRepository.findOne({
      relations: ['career', 'state'],
      where: {
        id,
      },
    });

    if (!curriculum) {
      throw new NotFoundException('El producto no se encontro');
    }
    curriculum.career = await this.careerService.findOne(payload.career.id);
    curriculum.state = await this.catalogueService.findOne(payload.state.id);

    this.curriculumRepository.merge(curriculum, payload);

    const curriculumUpdated = await this.curriculumRepository.save(curriculum);
    return {
      data: curriculumUpdated,
    };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const curriculum = await this.curriculumRepository.findOne({
      relations: ['career', 'state'],
      where: {
        id,
      },
    });

    if (!curriculum) {
      throw new NotFoundException('El producto no se encontro');
    }
    const curriculumDeleted = await this.curriculumRepository.softDelete(id);
    return {
      data: curriculumDeleted,
    };
  }

  async removeAll(
    payload: CurriculumEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const curriculaDeleted = await this.curriculumRepository.softRemove(
      payload,
    );
    return { data: curriculaDeleted };
  }

  private async paginateAndFilter(
    params: FilterCurriculumDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CurriculumEntity>
      | FindOptionsWhere<CurriculumEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
      where.push({ description: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ resolutionNumber: ILike(`%${search}%`) });
    }

    const response = await this.curriculumRepository.findAndCount({
      relations: ['career', 'state'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByWeeksNumber(
    weeksNumber: number,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<CurriculumEntity> = {};

    if (weeksNumber) {
      where.weeksNumber = LessThan(weeksNumber);
    }

    const response = await this.curriculumRepository.findAndCount({
      relations: ['career', 'state'],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
