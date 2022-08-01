import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';

export class InformationTeacherDto {
  @IsOptional()
  readonly countryHigherEducation: CatalogueEntity;

  @IsOptional()
  readonly dedicationTime: CatalogueEntity;

  @IsOptional()
  readonly financingType: CatalogueEntity;

  @IsOptional()
  readonly higherEducation: CatalogueEntity;

  @IsOptional()
  readonly scholarship: CatalogueEntity;

  @IsOptional()
  readonly scholarshipType: CatalogueEntity;

  @IsOptional()
  readonly teachingLadder: CatalogueEntity;

  @IsOptional()
  readonly academicUnit: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'El campo administrativeHours tiene que ser númerico.' },
  )
  @Min(0, {
    message: 'El campo administrativeHours número de caracteres mínimo es 0.',
  })
  readonly administrativeHours: number;

  @IsOptional()
  @IsNumber({}, { message: 'El campo classHours tiene que ser númerico.' })
  @Min(0, { message: 'El campo classHours número de caracteres mínimo es 0.' })
  readonly classHours: number;

  @IsOptional()
  @IsNumber({}, { message: 'El campo communityHours tiene que ser númerico.' })
  @Min(0, {
    message: 'El número de caracteres del campo communityHours  mínimo es 0.',
  })
  readonly communityHours: number;

  @IsOptional()
  @IsString({ message: 'degreeHigherEducation debe ser un texto' })
  readonly degreeHigherEducation: string;

  @IsOptional()
  @IsNumber({}, { message: 'El campo hoursWorked tiene que ser númerico.' })
  @Min(0, {
    message: 'El número de caracteres mínimo es 0 en el campo hoursWorked.',
  })
  readonly hoursWorked: number;

  @IsOptional()
  @IsDate({
    message: 'El campo holidays lleva las fechas de los dias festivos.',
  })
  readonly holidays: Date;

  @IsOptional()
  @IsDate({ message: 'El campo homeVacation es tipo fecha' })
  readonly homeVacation: Date;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'El campo investigationHours tiene que ser númerico.' },
  )
  @Min(0, {
    message:
      'El número de caracteres mínimo es 0 en el campo investigationHours.',
  })
  readonly investigationHours: number;

  @IsOptional()
  @IsString({ message: 'institutionHigherEducation debe ser un texto' })
  readonly institutionHigherEducation: string;

  @IsOptional()
  @IsString({ message: 'otherHours debe ser un texto' })
  readonly otherHours: string;

  @IsOptional()
  @IsNumber({}, { message: 'El campo publications tiene que ser númerico.' })
  @Min(1, {
    message: 'El número de caracteres mínimo es 0 en el campo publications.',
  })
  readonly publications: number;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'El campo scholarshipAmount tiene que ser númerico.' },
  )
  @Min(0, {
    message:
      'El número de caracteres mínimo es 0 en el campo scholarshipAmount.',
  })
  readonly scholarshipAmount: number;

  @IsOptional()
  @IsNumber({}, { message: 'El campo totalSubjects tiene que ser númerico.' })
  @Min(0, {
    message: 'El número de caracteres mínimo es 0 en el campo totalSubjects.',
  })
  readonly totalSubjects: number;

  @IsOptional()
  @IsString({ message: 'technical debe ser un texto' })
  @MaxLength(255, {
    message: 'Debe tener como Maximo 255 caracteres technical',
  })
  readonly technical: string;

  @IsOptional()
  @IsString({ message: 'technology debe ser un texto' })
  @MaxLength(255, {
    message: 'Debe tener como Maximo 255 caracteres technology',
  })
  readonly technology: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'El campo totalPublications tiene que ser númerico.' },
  )
  @Min(0, {
    message:
      'El número de caracteres mínimo es 0 en el campo totalPublications.',
  })
  readonly totalPublications: number;
}
