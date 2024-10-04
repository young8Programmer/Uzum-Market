import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.create(createOrderDto);
      return { message: 'Buyurtma muvaffaqiyatli yaratildi!', order };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        'Buyurtma yaratishda xatolik yuz berdi!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const orders = await this.orderService.findAll();
      return {
        message:
          orders.length > 0
            ? 'Barcha buyurtmalar'
            : 'Hozircha hech qanday buyurtma mavjud emas!',
        orders,
      };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        'Buyurtmalarni olishda xatolik yuz berdi!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const order = await this.orderService.findOne(+id);
      if (order) {
        return { message: `Buyurtma #${id} topildi`, order };
      } else {
        return { message: `Buyurtma #${id} topilmadi!` };
      }
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `Buyurtma #${id} ni olishda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const updatedOrder = await this.orderService.update(+id, updateOrderDto);
      if (updatedOrder) {
        return { message: `Buyurtma #${id} yangilandi`, updatedOrder };
      } else {
        return {
          message: `Buyurtma #${id} topilmadi! Yangilanish amalga oshirilmadi.`,
        };
      }
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `Buyurtma #${id} yangilashda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.orderService.remove(+id);

      return { message: `Buyurtma #${id} o'chirildi` };
    } catch (error) {
      console.error('Xatolik: ', error);
      throw new HttpException(
        `Buyurtma #${id} ni o'chirishda xatolik yuz berdi!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
