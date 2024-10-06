import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  Length,
} from 'class-validator';

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

  @IsEnum(['user', 'admin', 'store_owner', 'manager'])
  role: 'user' | 'admin' | 'store_owner' | 'manager';
}
