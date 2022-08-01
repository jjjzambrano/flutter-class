import { PartialType } from '@nestjs/swagger';
import { CreateInformationTeacherDto } from '@core/dto';

export class UpdateInformationTeacherDto extends PartialType(
  CreateInformationTeacherDto,
) {}
