import { User } from './../user/entities/user.entity';
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRole } from 'src/user/user-role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }


  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ message: string }> {
    const existingUser = await this.userService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Bu email orqali foydalanuvchi allaqachon mavjud');
    }

    const hashedPassword = await this.authService.hashPassword(registerDto.password);

    // To'g'ri qilib createUserDto yaratamiz
    const createUserDto = new CreateUserDto(); // Yangi instansiya yaratamiz
    createUserDto.email = registerDto.email;
    createUserDto.password = hashedPassword;
    createUserDto.role = registerDto.role as UserRole || UserRole.USER;


    await this.userService.create(createUserDto); // createUserDto obyekti uzatiladi

    return { message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi" };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi. Iltimos, email manzilini tekshiring.');
    }

    const isPasswordValid = await this.comparePassword(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Parol noto\'g\'ri. Iltimos, parolni qayta tekshiring.');
    }

    const token = await this.authService.generateToken(user);
    return { token };
  }
}