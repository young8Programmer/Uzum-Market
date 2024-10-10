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
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;


  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
 

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;


  @IsPhoneNumber(null)
  phone_number: string;
}
