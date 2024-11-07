import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional, Length, IsPhoneNumber } from 'class-validator';
import { UserRole } from 'src/user/user-role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
  
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsPhoneNumber(null)
  phone_number: string;
}
