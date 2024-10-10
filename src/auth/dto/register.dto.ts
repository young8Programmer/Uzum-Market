import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/user/user-role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}