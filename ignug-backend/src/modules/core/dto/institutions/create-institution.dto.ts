import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';

export class CreateInstitutionDto {
  @IsNotEmpty({ message: 'address no debe estar vacío' })
  readonly address: CatalogueEntity;

  @IsNotEmpty({ message: 'address no debe estar vacío' })
  readonly state: CatalogueEntity;

  @IsString({ message: 'Acronym debe ser texto' })
  @MinLength(2, { message: 'Acronym debe tener mínimo 2 caracteres' })
  @MaxLength(50, { message: 'Acronym debe tener máximo 2 caracteres' })
  readonly acronym: string;

  @IsString({ message: 'Cellphone debe ser texto' })
  @MinLength(5, { message: 'Cellphone debe tener mínimo 5 caractere' })
  @MaxLength(20, { message: 'Cellphone debe tener máximo 20 caracteres' })
  @IsOptional({ message: 'Cellphone es opcional' })
  readonly cellphone: string;

  @IsString({ message: 'Code debe ser texto' })
  @MinLength(1, { message: 'Code debe tener mínimo 1 caracter' })
  @MaxLength(50, { message: 'Code debe tener máximo 50 caracteres' })
  readonly code: string;

  @IsString({ message: 'codeSniese debe ser texto' })
  @MinLength(1, { message: 'codeSniese debe tener mínimo 1 caracter' })
  @MaxLength(50, { message: 'codeSniese debe tener máximo 50 caracteres' })
  readonly codeSniese: string;

  @IsString({ message: 'denomination debe ser texto' })
  @MinLength(1, { message: 'denomination debe tener mínimo 1 caracter' })
  @MaxLength(255, { message: 'denomination debe tener máximo 255 caracteres' })
  readonly denomination: string;

  @IsEmail({ message: 'email debe ser un email' })
  @IsOptional({ message: 'email es opcional' })
  readonly email: string;

  @IsString({ message: 'logo debe ser texto' })
  @IsOptional({ message: 'logo es opcional' })
  readonly logo: string;

  @IsString({ message: 'name debe ser texto' })
  @MaxLength(255, { message: 'name debe tener máximo 255 caracteres' })
  readonly name: string;

  @IsPositive({ message: 'numberStudents debe ser un número positivo' })
  readonly numberStudents: number;

  @IsString({ message: 'phone debe ser texto' })
  @MinLength(5, { message: 'phone debe tener mínimo 5 caracteres' })
  @MaxLength(20, { message: 'phone debe tener máximo 5 caracteres' })
  @IsOptional({ message: 'phone es opcional' })
  readonly phone: string;

  @IsString({ message: 'shortName debe ser texto' })
  @MaxLength(255, { message: 'shortName debe tener máximo 255 caracteres' })
  readonly shortName: string;

  @IsString({ message: 'slogan debe ser texto' })
  @MinLength(1, { message: 'slogan debe tener mínimo 1 caracter' })
  @MaxLength(1000, { message: 'slogan debe tener máximo 1000 caracteres' })
  @IsOptional({ message: 'slogan es opcional' })
  readonly slogan: string;

  @IsString({ message: 'web debe ser texto' })
  @IsOptional({ message: 'web es opcional' })
  @IsUrl({ message: 'web debe ser una url válida' })
  readonly web: string;
}
