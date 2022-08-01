import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterInformationStudentDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly community: number;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsString()
  readonly contactEmergencyName: string;

  @IsOptional()
  @IsString()
  readonly contactEmergencyKinship: string;

  @IsOptional()
  @IsString()
  readonly contactEmergencyPhone: string;

  @IsOptional()
  @IsString()
  readonly postalCode: string;
}
