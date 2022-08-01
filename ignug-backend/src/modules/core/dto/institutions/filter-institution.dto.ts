import { IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterInstitutionDto extends PaginationDto {
  @IsOptional()
  readonly acronym: string;

  @IsOptional()
  readonly cellphone: string;

  @IsOptional()
  readonly code: string;

  @IsOptional()
  readonly codeSniese: string;

  @IsOptional()
  readonly denomination: string;

  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly logo: string;

  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly phone: string;

  @IsOptional()
  readonly shortName: string;

  @IsOptional()
  readonly slogan: string;

  @IsOptional()
  readonly web: string;
}
