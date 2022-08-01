import { InstitutionEntity, CatalogueEntity } from '@core/entities';
import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
  IsNotEmpty,
  IsArray,
} from 'class-validator';

export class CareerDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  readonly institution: InstitutionEntity;

  @IsNotEmpty({ message: 'La modalidad es requerido' })
  readonly modality: CatalogueEntity;

  @IsNotEmpty({ message: 'El estado es requerido' })
  readonly state: CatalogueEntity;

  @IsOptional({ message: 'El tipo es opcional' })
  readonly type: CatalogueEntity;

  @IsString({ message: 'El campo acronym debe ser un string' })
  @MinLength(3, { message: 'El acronimo debe tener al menos 3 caracteres' })
  @MaxLength(10, { message: 'El acronimo no puede tener más de 10 caracteres' })
  readonly acronym: string;

  @IsString({ message: 'El campo code debe ser un string' })
  @MinLength(3, { message: 'El codigo debe tener al menos 3 caracter' })
  @MaxLength(20, { message: 'El codigo no puede tener más de 20 caracteres' })
  readonly code: string;

  @IsString({ message: 'El campo codeSniese debe ser un string' })
  readonly codeSniese: string;

  @IsString({ message: 'El campo degree debe ser un string' })
  readonly degree: string;

  @IsOptional()
  @IsString({ message: 'El campo logo debe ser un string' })
  readonly logo: string;

  @IsString({ message: 'El campo name debe ser un string' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 caracter' })
  readonly name: string;

  @IsString({ message: 'El campo resolutionNumber debe ser un string' })
  readonly resolutionNumber: string;

  @IsString({ message: 'El campo shortName debe ser un string' })
  readonly shortName: string;
}
