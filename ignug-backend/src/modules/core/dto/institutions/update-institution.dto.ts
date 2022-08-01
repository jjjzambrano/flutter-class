import { PartialType } from '@nestjs/swagger';
import { CreateInstitutionDto } from '@core/dto';

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {}
