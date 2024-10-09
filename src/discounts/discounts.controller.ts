import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    try {
      const discount = await this.discountsService.create(createDiscountDto);
      return {
        message: 'Discount created successfully',
        discount,
      };
    } catch (error) {
      console.error('Error occurred while creating discount:', error);
      throw new HttpException(
        'Failed to create discount',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    const discounts = await this.discountsService.findAll();
    return {
      message: 'Discounts retrieved successfully',
      discounts,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const discount = await this.discountsService.findOne(id);
    if (!discount) {
      throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Discount retrieved successfully',
      discount,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiscountDto: CreateDiscountDto,
  ) {
    const discount = await this.discountsService.findOne(id);
    if (!discount) {
      throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);
    }
    const updatedDiscount = await this.discountsService.update(
      id,
      updateDiscountDto,
    );
    return {
      message: 'Discount updated successfully',
      discount: updatedDiscount,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const discount = await this.discountsService.findOne(id);
    if (!discount) {
      throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);
    }
    await this.discountsService.remove(id);
    return {
      message: 'Discount deleted successfully',
    };
  }
}
