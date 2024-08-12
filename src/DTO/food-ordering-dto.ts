/* eslint-disable prettier/prettier */
import { ItemStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class RegisterCustomerDto {
  @IsString()
  customer_name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginCustomerDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  passwordLogin: string;
}

export class CreateGuestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;
}
