import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoreOwnersService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { CartItem } from './entities/cart_item.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('cart-items')
@UseGuards(AuthGuard, RolesGuard)
export class CartItemsController {
  constructor(private readonly StoreOwnersService: StoreOwnersService) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return this.StoreOwnersService.create(createCartItemDto);
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get()
  findAll(): Promise<CartItem[]> {
    return this.StoreOwnersService.findAll();
  }

  @Roles(UserRole.USER, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<CartItem> {
    return this.StoreOwnersService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.StoreOwnersService.update(id, updateCartItemDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.StoreOwnersService.remove(id);
  }
}
