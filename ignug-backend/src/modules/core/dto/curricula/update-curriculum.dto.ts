import { PartialType } from '@nestjs/swagger';
import { CreateCurriculumDto } from '@core/dto';

export class UpdateCurriculumDto extends PartialType(CreateCurriculumDto) {}
