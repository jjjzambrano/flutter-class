import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterSubjectDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly autonomousHour: number;

  @IsOptional()
  @IsString()
  readonly code: string;

  @IsOptional()
  @IsString()
  readonly name: string;
}
