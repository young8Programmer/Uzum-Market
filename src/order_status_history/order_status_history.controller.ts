import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderStatusHistoryService } from './order_status_history.service';
import { CreateOrderStatusHistoryDto } from './dto/create-order_status_history.dto';
import { UpdateOrderStatusHistoryDto } from './dto/update-order_status_history.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('order-status-history')
@UseGuards(AuthGuard, RolesGuard)
export class OrderStatusHistoryController {
  constructor(
    private readonly orderStatusHistoryService: OrderStatusHistoryService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createOrderStatusHistoryDto: CreateOrderStatusHistoryDto) {
    return this.orderStatusHistoryService.create(createOrderStatusHistoryDto);
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get()
  findAll() {
    return this.orderStatusHistoryService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatusHistoryService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
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

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatusHistoryService.remove(+id);
  }
}
