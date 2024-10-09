import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { Auth } from "./entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRole } from "../user/user-role.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException("malumotlar xato");
        }
        const payload = { username: user.username, sub: user.id, role: user.role };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });
        await this.saveRefreshToken(user.id, refreshToken, accessToken); 

        return { access_token: accessToken, refresh_token: refreshToken};
    }

    async saveRefreshToken(userId: number, refreshToken: string, accessToken: string) {
        const auth = new Auth();
        auth.userId = userId;
        auth.refreshToken = refreshToken;
        auth.accessToken = accessToken
        await this.authRepository.save(auth);
    }

    async refreshToken(userId: number, refreshToken: string) {
        const auth = await this.authRepository.findOne({ where: { userId } });

        if (!auth || auth.refreshToken !== refreshToken) {
            throw new UnauthorizedException("refresh token xato");
        }

        const user = await this.userService.findById(userId);
        const payload = { username: user.username, sub: userId, role: user.role };
        const newAccessToken = this.jwtService.sign(payload);

        return { access_token: newAccessToken};
    }

    async register(registerDto: RegisterDto) {
        const hashedPassword = bcrypt.hashSync(registerDto.password, 10);
        const user = await this.userService.create({
            ...registerDto,
            password: hashedPassword,
            role: registerDto.role as UserRole,
        });
        return user;
    }
}
