import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/user/user-role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  role?: string;
}
