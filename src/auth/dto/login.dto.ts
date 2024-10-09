import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email: string; // Foydalanuvchi emaili

    @IsString()
    @IsNotEmpty()
    password: string; // Parol
}
