import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { StoreOwnersService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { CartItem } from './entities/cart_item.entity';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly StoreOwnersService: StoreOwnersService) {}

  @Post('create')
  create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return this.StoreOwnersService.create(createCartItemDto);
  }

  @Get()
  findAll(): Promise<CartItem[]> {
    return this.StoreOwnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CartItem> {
    return this.StoreOwnersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.StoreOwnersService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.StoreOwnersService.remove(id);
  }
}
