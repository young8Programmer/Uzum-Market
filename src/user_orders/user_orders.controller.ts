import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserOrdersService } from './user_orders.service';
import { CreateUserOrderDto } from './dto/create-user_order.dto';
import { UpdateUserOrderDto } from './dto/update-user_order.dto';

@Controller('user-orders')
export class UserOrdersController {
  constructor(private readonly userOrdersService: UserOrdersService) {}

  @Post()
  create(@Body() createUserOrderDto: CreateUserOrderDto) {
    return this.userOrdersService.create(createUserOrderDto);
  }

  @Get()
  findAll() {
    return this.userOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserOrderDto: UpdateUserOrderDto) {
    return this.userOrdersService.update(+id, updateUserOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userOrdersService.remove(+id);
  }
}
