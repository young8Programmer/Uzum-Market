import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderStatusHistoryDto } from './dto/create-order_status_history.dto';
import { UpdateOrderStatusHistoryDto } from './dto/update-order_status_history.dto';
import { OrderStatusHistory } from './entities/order_status_history.entity';

@Injectable()
export class OrderStatusHistoryService {
  constructor(
    @InjectRepository(OrderStatusHistory)
    private readonly orderStatusHistoryRepository: Repository<OrderStatusHistory>,
  ) {}

  async create(
    createOrderStatusHistoryDto: CreateOrderStatusHistoryDto,
  ): Promise<OrderStatusHistory> {
    const orderStatusHistory = this.orderStatusHistoryRepository.create(
      createOrderStatusHistoryDto,
    );
    return await this.orderStatusHistoryRepository.save(orderStatusHistory);
  }

  async findAll(): Promise<OrderStatusHistory[]> {
    return await this.orderStatusHistoryRepository.find();
  }

  async findOne(id: number): Promise<OrderStatusHistory> {
    const orderStatusHistory = await this.orderStatusHistoryRepository.findOne({
      where: { id },
    });
    if (!orderStatusHistory) {
      throw new Error(`Order status history with id ${id} not found`);
    }
    return orderStatusHistory;
  }

  async update(
    id: number,
    updateOrderStatusHistoryDto: UpdateOrderStatusHistoryDto,
  ): Promise<OrderStatusHistory> {
    await this.orderStatusHistoryRepository.update(
      id,
      updateOrderStatusHistoryDto,
    );
    const updatedOrderStatusHistory = await this.findOne(id);
    return updatedOrderStatusHistory;
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderStatusHistoryRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Order status history with id ${id} not found`);
    }
  }
}
