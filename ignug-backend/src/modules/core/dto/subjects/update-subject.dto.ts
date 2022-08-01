import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from '@core/dto';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
