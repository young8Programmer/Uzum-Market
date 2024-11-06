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
  UseGuards,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('discounts')
@UseGuards(AuthGuard, RolesGuard)
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Roles(UserRole.ADMIN)
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

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get()
  async findAll() {
    const discounts = await this.discountsService.findAll();
    return {
      message: 'Discounts retrieved successfully',
      discounts,
    };
  }

  @Roles(UserRole.USER, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.ADMIN)
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

  @Roles(UserRole.ADMIN)
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

  @Roles(UserRole.ADMIN)
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
