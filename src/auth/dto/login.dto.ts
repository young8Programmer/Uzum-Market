import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string; 

  @IsString()
  @IsNotEmpty()
  password: string; // Parol

}
