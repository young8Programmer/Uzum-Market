import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
