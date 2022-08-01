import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'El campo debe ser de tipo string' })
  name: string;

  @IsNumber({}, { message: 'El campo userId debe ser un numero' })
  @IsPositive({ message: 'El campo userId debe ser un entero positivo' })
  userId: number;

  @IsNumber({}, { message: 'studentId Tiene que ser de tipo numero' })
  @IsPositive({ message: 'studentId debe ser un entero positivo' })
  studentId: number;
}
