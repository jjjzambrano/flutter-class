import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CatalogueEntity, CurriculumEntity } from '@core/entities';

export class SubjectDto {
  @IsNotEmpty({ message: 'El campo academicPeriod es obligatorio' })
  readonly academicPeriod: CatalogueEntity;

  @IsNotEmpty({ message: 'El campo curriculum es obligatorio' })
  readonly curriculum: CurriculumEntity;

  @IsNotEmpty({ message: 'El campo state es obligatorio' })
  readonly state: CatalogueEntity;

  @IsNotEmpty({ message: 'El campo state es obligatorio' })
  readonly type: CatalogueEntity;

  @IsNumber({}, { message: 'El campo autonomousHours debe ser un número' })
  @Min(0, { message: 'El campo autonomousHours debe tener mínimo 0' })
  readonly autonomousHour: number;

  @IsString({ message: 'El campo code debe ser un string' })
  @MinLength(5, { message: 'El campo code debe tener mínimo 5 caracteres' })
  readonly code: string;

  @IsOptional()
  @IsNumber({}, { message: 'El campo credit debe ser un número' })
  @Min(0, { message: 'El campo credit debe tener mínimo 0' })
  readonly credit: number;

  @IsString({ message: 'El campo name debe ser un string' })
  readonly name: string;

  @IsNumber({}, { message: 'El campo practicalHour debe ser un número' })
  @Min(0, { message: 'El campo practicalHour debe tener minimo 0' })
  readonly practicalHour: number;

  @IsNumber({}, { message: 'El campo scale debe ser un número' })
  @Min(0, { message: 'El campo scale debe tener mínimo 0' })
  @Max(1, { message: 'El campo scale debe tener maximo 1' })
  readonly scale: number;

  @IsNumber({}, { message: 'El campo teacherHour debe ser un número' })
  @Min(0, { message: 'El campo teacherHour debe tener mínimo 0' })
  readonly teacherHour: number;
}
