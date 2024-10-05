import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderStatusHistoryService } from './order_status_history.service';
import { CreateOrderStatusHistoryDto } from './dto/create-order_status_history.dto';
import { UpdateOrderStatusHistoryDto } from './dto/update-order_status_history.dto';

@Controller('order-status-history')
export class OrderStatusHistoryController {
  constructor(
    private readonly orderStatusHistoryService: OrderStatusHistoryService,
  ) {}

  @Post()
  create(@Body() createOrderStatusHistoryDto: CreateOrderStatusHistoryDto) {
    return this.orderStatusHistoryService.create(createOrderStatusHistoryDto);
  }

  @Get()
  findAll() {
    return this.orderStatusHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatusHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusHistoryDto: UpdateOrderStatusHistoryDto,
  ) {
    return this.orderStatusHistoryService.update(
      +id,
      updateOrderStatusHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatusHistoryService.remove(+id);
  }
}
