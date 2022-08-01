import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  CreateInstitutionDto,
  FilterInstitutionDto,
  PaginationDto,
  UpdateInstitutionDto,
} from '@core/dto';
import { InstitutionEntity } from '@core/entities';
import { CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class InstitutionsService {
  constructor(
    @Inject(RepositoryEnum.INSTITUTION_REPOSITORY)
    private institutionRepository: Repository<InstitutionEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async create(
    payload: CreateInstitutionDto,
  ): Promise<ServiceResponseHttpModel> {
    const newInstitution = this.institutionRepository.create(payload);
    newInstitution.address = await this.cataloguesService.findOne(
      payload.address.id,
    );
    newInstitution.state = await this.cataloguesService.findOne(
      payload.state.id,
    );
    const institutionCreated = await this.institutionRepository.save(
      newInstitution,
    );
    return { data: institutionCreated };
  }

  async findAll(
    params?: FilterInstitutionDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    // if (params.numberStudents) {
    //   return await this.filterByNumberStudents(params.numberStudents);
    // }

    //All
    const data = await this.institutionRepository.findAndCount({
      relations: ['address', 'state'],
    });
    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<any> {
    const institution = await this.institutionRepository.findOne({
      relations: ['address', 'state'],
      where: { id },
    });
    if (!institution) throw new NotFoundException('Institution not found');
    return institution;
  }

  async update(
    id: number,
    payload: UpdateInstitutionDto,
  ): Promise<ServiceResponseHttpModel> {
    const institution = await this.institutionRepository.findOneBy({ id });

    if (!institution) throw new NotFoundException('Institution not found');

    institution.address = await this.cataloguesService.findOne(
      payload.address.id,
    );
    institution.state = await this.cataloguesService.findOne(payload.state.id);
    this.institutionRepository.merge(institution, payload);
    const institutionUpdated = await this.institutionRepository.save(
      institution,
    );
    return { data: institutionUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const institution = await this.institutionRepository.findOneBy({ id });
    if (!institution) throw new NotFoundException('Institution not found');

    const institutionDeleted = await this.institutionRepository.softDelete(id);
    return { data: institutionDeleted };
  }

  async removeAll(
    payload: InstitutionEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const institutionsDeleted = await this.institutionRepository.softRemove(
      payload,
    );
    return { data: institutionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterInstitutionDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<InstitutionEntity>
      | FindOptionsWhere<InstitutionEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ acronym: ILike(`%${search}`) });
      where.push({ cellphone: ILike(`%${search}`) });
      where.push({ code: ILike(`%${search}`) });
      where.push({ codeSniese: ILike(`%${search}`) });
      where.push({ denomination: ILike(`%${search}`) });
      where.push({ email: ILike(`%${search}`) });
      where.push({ logo: ILike(`%${search}`) });
      where.push({ name: ILike(`%${search}`) });
      where.push({ phone: ILike(`%${search}`) });
      where.push({ shortName: ILike(`%${search}`) });
      where.push({ slogan: ILike(`%${search}`) });
      where.push({ web: ILike(`%${search}`) });
    }

    const response = await this.institutionRepository.findAndCount({
      relations: ['address', 'state'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }
}
