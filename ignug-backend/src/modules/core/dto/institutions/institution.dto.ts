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

export class InstitutionDto {
  @IsNotEmpty({ message: 'address no debe estar vacío' })
  readonly address: CatalogueEntity;

  @IsNotEmpty({ message: 'address no debe estar vacío' })
  readonly state: CatalogueEntity;

  @IsString({ message: 'Acronym debe ser texto' })
  @MinLength(3, { message: 'Acronym debe tener mínimo 2 caracteres' })
  readonly acronym: string;

  @IsOptional()
  @IsString({ message: 'Cellphone debe ser texto' })
  readonly cellphone: string;

  @IsString({ message: 'Code debe ser texto' })
  @MinLength(3, { message: 'Code debe tener mínimo 1 caracter' })
  readonly code: string;

  @IsString({ message: 'codeSniese debe ser texto' })
  readonly codeSniese: string;

  @IsString({ message: 'denomination debe ser texto' })
  readonly denomination: string;

  @IsOptional()
  @IsEmail({ message: 'email debe ser un email' })
  readonly email: string;

  @IsOptional()
  @IsString({ message: 'logo debe ser texto' })
  readonly logo: string;

  @IsString({ message: 'name debe ser texto' })
  readonly name: string;

  @IsOptional({ message: 'phone es opcional' })
  @IsString({ message: 'phone debe ser texto' })
  readonly phone: string;

  @IsString({ message: 'shortName debe ser texto' })
  readonly shortName: string;

  @IsOptional({ message: 'slogan es opcional' })
  @IsString({ message: 'slogan debe ser texto' })
  readonly slogan: string;

  @IsOptional({ message: 'web es opcional' })
  @IsString({ message: 'web debe ser texto' })
  @IsUrl({ message: 'web debe ser una url válida' })
  readonly web: string;
}
