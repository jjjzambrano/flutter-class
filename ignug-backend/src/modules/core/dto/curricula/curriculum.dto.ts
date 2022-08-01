import {
  IsNumber,
  IsString,
  MinLength,
  IsDate,
  Min,
  Max,
  MaxLength,
  IsPositive,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { CareerEntity, CatalogueEntity } from '@core/entities';

export class CurriculumDto {
  @IsNotEmpty()
  readonly career: CareerEntity;

  @IsNotEmpty()
  readonly state: CatalogueEntity;

  @IsString({ message: 'el campo code es de tipo string' })
  @MinLength(3, { message: ' el campo code minimo 3 caracteres' })
  readonly code: string;

  @IsString({ message: ' el campo description es de tipo string' })
  @MinLength(10, { message: '  el campo description minimo 2 caracteres' })
  readonly description: string;

  @IsOptional({ message: ' el campo endedAt debe ser opcional' })
  @IsDate({ message: ' el campo endedAt debe ser una fecha' })
  readonly endedAt: Date;

  @IsString({ message: ' el campo name es de tipo string' })
  readonly name: string;

  @IsPositive({ message: ' el campo periodicAcademicNumber es positivo' })
  readonly periodicAcademicNumber: number;

  @IsString({ message: ' el campo resolutionNumber es de tipo string' })
  readonly resolutionNumber: string;

  @IsOptional({ message: 'el campo startedAt es opcional' })
  @IsDate({ message: ' el campo startedAt de tipo Date' })
  readonly startedAt: Date;

  @IsPositive({ message: ' el campo weeksNumber debe ser positivo' })
  readonly weeksNumber: number;
}
