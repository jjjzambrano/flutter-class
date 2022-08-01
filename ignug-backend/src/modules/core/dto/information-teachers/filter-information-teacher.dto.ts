import { IsDate, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterInformationTeacherDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly academicUnit: string;

  @IsOptional()
  @IsString()
  readonly degreeHigherEducation: string;

  @IsOptional()
  @IsDate()
  readonly holidays: Date;

  @IsOptional()
  @IsString()
  readonly institutionHigherEducation: string;

  @IsOptional()
  @IsString()
  readonly otherHours: string;

  @IsOptional()
  @IsString()
  readonly technical: string;

  @IsOptional()
  @IsString()
  readonly technology: string;
}
