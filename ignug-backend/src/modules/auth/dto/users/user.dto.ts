import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsArray,
  MaxLength,
  IsDate,
} from 'class-validator';
import { CatalogueEntity } from '@core/entities';
import { Exclude } from 'class-transformer';

export class UserDto {
  @IsOptional()
  readonly bloodType: CatalogueEntity;

  @IsOptional()
  readonly ethnicOrigin: CatalogueEntity;

  @IsOptional()
  readonly identificationType: CatalogueEntity;

  @IsOptional()
  readonly gender: CatalogueEntity;

  @IsOptional()
  readonly maritalStatus: CatalogueEntity;

  @IsOptional()
  readonly sex: CatalogueEntity;
  @IsOptional()
  @IsDate({ message: 'El campo birthdate debe ser una fecha válida' })
  readonly birthdate: Date;

  @IsNotEmpty({ message: 'El campo identification es obligatorio' })
  @IsString({ message: 'El campo identification debe ser un string' })
  readonly identification: string;

  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsEmail({ message: 'El campo email debe ser un correo electrónico' })
  @MaxLength(150, {
    message: 'El campo email debe contener máximo 150 caracteres',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsEmail({ message: 'El campo email debe ser un correo electrónico' })
  @MaxLength(150, {
    message: 'El campo email debe contener máximo 150 caracteres',
  })
  readonly emailVerifiedAt: string;

  @IsNotEmpty({ message: 'El campo lastname es obligatorio' })
  @IsString({ message: 'El campo lastname debe ser un string' })
  @MinLength(1, {
    message: 'El campo lastname debe contener al menos 1 caracteres',
  })
  @MaxLength(100, {
    message: 'El campo lastname debe contener máximo 100 caracteres',
  })
  readonly lastname: string;

  @IsNotEmpty({ message: 'El campo password es obligatorio' })
  @IsString()
  @MinLength(8, {
    message: 'El campo password debe contener al menos 8 caracteres',
  })
  @MaxLength(32, {
    message: 'El campo password debe contener máximo 32 caracteres',
  })
  readonly password: string;

  @IsOptional()
  @IsBoolean({
    message: 'El campo passwordChanged debe ser de tipo booleano',
  })
  readonly passwordChanged: boolean;

  @IsOptional()
  @MaxLength(20, {
    message: 'El campo phone debe contener máximo 20 caracteres',
  })
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: 'El campo password debe contener al menos 8 caracteres',
  })
  @MaxLength(100, {
    message: 'El campo password debe contener máximo 20 caracteres',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  readonly roles: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(5, {
    message: 'El campo username debe contener al menos 5 caracteres',
  })
  @MaxLength(20, {
    message: 'El campo username debe contener máximo 20 caracteres',
  })
  readonly username: string;
}
