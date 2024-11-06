import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { Discount } from './entities/discount.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Discount]), JwtModule],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
