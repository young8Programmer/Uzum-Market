import { Module } from '@nestjs/common';
import { OrderStatusHistoryService } from './order_status_history.service';
import { OrderStatusHistoryController } from './order_status_history.controller';
import { OrderStatusHistory } from './entities/order_status_history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusHistory]), JwtModule],
  controllers: [OrderStatusHistoryController],
  providers: [OrderStatusHistoryService],
})
export class OrderStatusHistoryModule {}
