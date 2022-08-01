import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterCatalogueDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
