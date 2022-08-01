import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from '@core/dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
