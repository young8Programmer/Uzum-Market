import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserOrdersService } from './user_orders.service';
import { CreateUserOrderDto } from './dto/create-user_order.dto';
import { UpdateUserOrderDto } from './dto/update-user_order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('user-orders')
@UseGuards(AuthGuard, RolesGuard)
export class UserOrdersController {
  constructor(private readonly userOrdersService: UserOrdersService) {}

  @Roles(UserRole.ADMIN, UserRole.STORE_OWNER)
  @Post()
  create(@Body() createUserOrderDto: CreateUserOrderDto) {
    return this.userOrdersService.create(createUserOrderDto);
  }

  @Roles(UserRole.ADMIN, UserRole.STORE_OWNER, UserRole.MANAGER, UserRole.USER)
  @Get()
  findAll() {
    return this.userOrdersService.findAll();
  }

  @Roles(UserRole.USER, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userOrdersService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserOrderDto: UpdateUserOrderDto) {
    return this.userOrdersService.update(+id, updateUserOrderDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userOrdersService.remove(+id);
  }
}
