import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module'; // AuthModule ni import qiling

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule], // AuthModule ni qo'shish
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
