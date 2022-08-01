import { PartialType } from '@nestjs/swagger';
import { CreateCareerDto } from '@core/dto';

export class UpdateCareerDto extends PartialType(CreateCareerDto) {}
