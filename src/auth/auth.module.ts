import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'judayam_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
