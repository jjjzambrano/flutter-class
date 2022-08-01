import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import {
  CreateInformationTeacherDto,
  FilterInformationTeacherDto,
  UpdateInformationTeacherDto,
} from '@core/dto';
import { InformationTeacherEntity } from '@core/entities';
import { PaginationDto } from '@core/dto';
import { CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class InformationTeachersService {
  constructor(
    @Inject(RepositoryEnum.INFORMATION_TEACHER_REPOSITORY)
    private InformationTeacherRepository: Repository<InformationTeacherEntity>,
    private catalogueService: CataloguesService,
  ) {}

  async create(
    payload: CreateInformationTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    const newInformationTeacher =
      this.InformationTeacherRepository.create(payload);

    newInformationTeacher.countryHigherEducation =
      await this.catalogueService.findOne(payload.countryHigherEducation.id);

    newInformationTeacher.dedicationTime = await this.catalogueService.findOne(
      payload.dedicationTime.id,
    );

    newInformationTeacher.financingType = await this.catalogueService.findOne(
      payload.financingType.id,
    );

    newInformationTeacher.higherEducation = await this.catalogueService.findOne(
      payload.higherEducation.id,
    );

    newInformationTeacher.scholarship = await this.catalogueService.findOne(
      payload.scholarship.id,
    );

    newInformationTeacher.scholarshipType = await this.catalogueService.findOne(
      payload.scholarshipType.id,
    );

    newInformationTeacher.teachingLadder = await this.catalogueService.findOne(
      payload.teachingLadder.id,
    );

    // newInformationTeacher.username = await this.catalogueService.findOne(
    //   payload.username.id,
    // );

    const informationTeacherCreated =
      await this.InformationTeacherRepository.save(newInformationTeacher);

    return { data: informationTeacherCreated };
  }

  async findAll(
    params?: FilterInformationTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination
    if (params.limit && params.page) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.holidays) {
      return this.filterByHolidays(params.holidays);
    }
    const data = await this.InformationTeacherRepository.findAndCount({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ],
    });
    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<ServiceResponseHttpModel> {
    const informationTeacher = await this.InformationTeacherRepository.findOne({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ],
      where: { id },
    });

    if (!informationTeacher) {
      throw new NotFoundException('InformationTeacher not found');
    }

    return { data: informationTeacher };
  }

  async update(
    id: number,
    payload: UpdateInformationTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    const informationTeacher =
      await this.InformationTeacherRepository.findOneBy({ id });

    if (!informationTeacher) {
      throw new NotFoundException('Information teacher not found');
    }
    informationTeacher.countryHigherEducation =
      await this.catalogueService.findOne(payload.countryHigherEducation.id);

    informationTeacher.dedicationTime = await this.catalogueService.findOne(
      payload.dedicationTime.id,
    );

    informationTeacher.financingType = await this.catalogueService.findOne(
      payload.financingType.id,
    );

    informationTeacher.higherEducation = await this.catalogueService.findOne(
      payload.higherEducation.id,
    );

    informationTeacher.scholarship = await this.catalogueService.findOne(
      payload.scholarship.id,
    );

    informationTeacher.scholarshipType = await this.catalogueService.findOne(
      payload.scholarshipType.id,
    );

    informationTeacher.teachingLadder = await this.catalogueService.findOne(
      payload.teachingLadder.id,
    );

    // informationTeacher.username = await this.catalogueService.findOne(
    //   payload.username.id,
    // );

    this.InformationTeacherRepository.merge(informationTeacher, payload);
    const informationTeacherUpdated =
      await this.InformationTeacherRepository.save(informationTeacher);

    return { data: informationTeacherUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const informationTeacher =
      await this.InformationTeacherRepository.findOneBy({ id });

    if (!informationTeacher) {
      throw new NotFoundException('information teacher not found');
    }

    const informationTeacherDeleted =
      await this.InformationTeacherRepository.save(informationTeacher);

    return { data: informationTeacherDeleted };
  }

  async removeAll(
    payload: InformationTeacherEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const informationTeachersDeleted =
      await this.InformationTeacherRepository.softRemove(payload);

    return { data: informationTeachersDeleted };
  }

  private async paginateAndFilter(
    params: FilterInformationTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<InformationTeacherEntity>
      | FindOptionsWhere<InformationTeacherEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ academicUnit: ILike(`%${search}%`) });
      where.push({ degreeHigherEducation: ILike(`%${search}%`) });
      where.push({ institutionHigherEducation: ILike(`%${search}%`) });
      where.push({ otherHours: ILike(`%${search}%`) });
      where.push({ technical: ILike(`%${search}%`) });
      where.push({ technology: ILike(`%${search}%`) });
    }

    const response = await this.InformationTeacherRepository.findAndCount({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByHolidays(
    holidays: Date,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<InformationTeacherEntity> = {};

    if (holidays) {
      where.holidays = LessThan(holidays);
    }

    const response = await this.InformationTeacherRepository.findAndCount({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
