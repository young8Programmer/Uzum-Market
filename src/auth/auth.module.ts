import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'judayam_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
