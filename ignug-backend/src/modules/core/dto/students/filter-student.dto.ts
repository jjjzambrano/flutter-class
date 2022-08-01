import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterStudentDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
