import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from 'src/user/user-role.enum';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await this.hashPassword(registerDto.password);
    const role = UserRole.USER;
    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
      role,
    });
    return user;
  }
}
