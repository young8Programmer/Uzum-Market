import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    if (!createOrderDto) {
      throw new HttpException(
        "Ma'lumotlar to'liq emas",
        HttpStatus.BAD_REQUEST,
      );
    }

    const newOrder = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new HttpException('Buyurtma topilmadi', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    if (!updateOrderDto) {
      throw new HttpException(
        "Yangilash ma'lumotlari to'liq emas",
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.orderRepository.update(id, updateOrderDto);
    const updatedOrder = await this.orderRepository.findOne({ where: { id } });

    if (!updatedOrder) {
      throw new HttpException('Buyurtma topilmadi', HttpStatus.NOT_FOUND);
    }

    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Buyurtma topilmadi', HttpStatus.NOT_FOUND);
    }
  }
}
