import { Module } from '@nestjs/common';
import { UserOrdersService } from './user_orders.service';
import { UserOrdersController } from './user_orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrder } from './entities/user_order.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrder]), JwtModule],
  controllers: [UserOrdersController],
  providers: [UserOrdersService],
})
export class UserOrdersModule {}
