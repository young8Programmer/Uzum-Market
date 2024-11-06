import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), JwtModule],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
