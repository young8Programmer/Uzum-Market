import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  Length,
} from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 10)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phone_number: string;

  @IsEnum(UserRole)
  role: UserRole
}
