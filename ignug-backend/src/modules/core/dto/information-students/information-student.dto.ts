import {
  IsNumber,
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';

export class InformationStudentDto {
  @IsNotEmpty()
  readonly isExecutedPractice: CatalogueEntity;

  @IsNotEmpty()
  readonly isExecutedCommunity: CatalogueEntity;

  @IsNotEmpty()
  readonly isDisability: CatalogueEntity;

  @IsNotEmpty()
  readonly isLostGratuity: CatalogueEntity;

  @IsNotEmpty()
  readonly isSubjectRepeat: CatalogueEntity;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(1000, { message: 'Maximo 1000 caracteres' })
  readonly address: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digitos mínimo es 0.' })
  readonly community: number;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyName: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyKinship: string;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(255, { message: 'Maximo 255 caracteres' })
  readonly contactEmergencyPhone: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  @Max(100, { message: 'Maximo 100 digito' })
  readonly disabilityPercentage: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  readonly educationalAmount: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  readonly economicAmount: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  readonly familyIncome: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(1, { message: 'El número de digitos mínimo es 1.' })
  @Max(20, { message: 'Maximo 20 digitos' })
  readonly membersHouseNumber: number;

  @IsString({ message: 'Debe ser un string' })
  @MaxLength(100, { message: 'Maximo 100 caracteres' })
  readonly postalCode: string;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  readonly practiceHours: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  readonly scholarshipAmount: number;

  @IsNumber({}, { message: 'Debe ser tipo numero' })
  @Min(0, { message: 'El número de digito mínimo es 0.' })
  @Max(100, { message: 'Maximo 100 digito' })
  readonly tariffScholarshipPercentage: number;
}
