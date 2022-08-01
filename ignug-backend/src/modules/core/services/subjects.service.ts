import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import {
  CreateSubjectDto,
  FilterSubjectDto,
  UpdateSubjectDto,
} from '@core/dto';
import { SubjectEntity } from '@core/entities';
import { PaginationDto } from '@core/dto';
import { CataloguesService, CurriculaService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(RepositoryEnum.SUBJECT_REPOSITORY)
    private subjectRepository: Repository<SubjectEntity>,
    private catalogueService: CataloguesService,
    private curriculumService: CurriculaService,
  ) {}

  async create(payload: CreateSubjectDto): Promise<ServiceResponseHttpModel> {
    const newSubject = this.subjectRepository.create(payload);

    newSubject.academicPeriod = await this.catalogueService.findOne(
      payload.academicPeriod.id,
    );

    newSubject.state = await this.catalogueService.findOne(payload.state.id);

    newSubject.type = await this.catalogueService.findOne(payload.type.id);

    newSubject.curriculum = await this.curriculumService.findOne(
      payload.curriculum.id,
    );

    const subjectCreated = await this.subjectRepository.save(newSubject);

    return { data: subjectCreated };
  }

  async findAll(params?: FilterSubjectDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.autonomousHour) {
      return this.filterByAutonomousHour(params.autonomousHour);
    }

    //All
    const data = await this.subjectRepository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<ServiceResponseHttpModel> {
    const subject = await this.subjectRepository.findOne({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return { data: subject };
  }

  async update(
    id: number,
    payload: UpdateSubjectDto,
  ): Promise<ServiceResponseHttpModel> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    subject.academicPeriod = await this.catalogueService.findOne(
      payload.academicPeriod.id,
    );

    subject.state = await this.catalogueService.findOne(payload.state.id);

    subject.type = await this.catalogueService.findOne(payload.type.id);

    subject.curriculum = await this.curriculumService.findOne(
      payload.curriculum.id,
    );

    this.subjectRepository.merge(subject, payload);
    const subjectUpdated = await this.subjectRepository.save(subject);

    return { data: subjectUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    const subjectDeleted = await this.subjectRepository.save(subject);

    return { data: subjectDeleted };
  }

  async removeAll(payload: SubjectEntity[]): Promise<ServiceResponseHttpModel> {
    const subjectsDeleted = await this.subjectRepository.softRemove(payload);

    return { data: subjectsDeleted };
  }

  private async paginateAndFilter(
    params: FilterSubjectDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<SubjectEntity>
      | FindOptionsWhere<SubjectEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.subjectRepository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByAutonomousHour(
    autonomousHour: number,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<SubjectEntity> = {};

    if (autonomousHour) {
      where.autonomousHour = LessThan(autonomousHour);
    }

    const response = await this.subjectRepository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
