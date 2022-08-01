import { PartialType } from '@nestjs/swagger';
import { CreateInformationStudentDto } from '@core/dto';

export class UpdateInformationStudentDto extends PartialType(
  CreateInformationStudentDto,
) {}
