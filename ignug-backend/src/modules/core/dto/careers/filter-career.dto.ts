import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterCareerDto extends PaginationDto {
  @IsString({ message: 'El campo acronym debe ser un string' })
  @IsOptional()
  readonly acronym: string;

  @IsString({ message: 'El campo code debe ser un string' })
  @IsOptional()
  readonly code: string;

  @IsString({ message: 'El campo codeSniese debe ser un string' })
  @IsOptional()
  readonly codeSniese: string;

  @IsString({ message: 'El campo logo debe ser un string' })
  @IsOptional()
  readonly logo: string;

  @IsString({ message: 'El campo name debe ser un string' })
  @IsOptional()
  readonly name: string;

  @IsNumber({}, { message: 'El campo resolutionNumber debe ser un numero' })
  readonly resolutionNumber: number;

  @IsString({ message: 'El campo shortName debe ser un string' })
  @IsOptional()
  readonly shortName: string;

  @IsString({ message: 'El campo title debe ser un string' })
  @IsOptional()
  readonly title: string;
}
