import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('coupons')
@UseGuards(AuthGuard, RolesGuard)
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createCouponDto: CreateCouponDto) {
    try {
      const coupon = await this.couponsService.create(createCouponDto);
      return {
        message: 'Coupon created successfully',
        coupon,
      };
    } catch (error) {
      console.error('Error occurred while creating coupon:', error);
      throw new HttpException(
        'Failed to create coupon',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.USER)
  @Get()
  async findAll() {
    const coupons = await this.couponsService.findAll();
    return {
      message: 'Coupons retrieved successfully',
      coupons,
    };
  }

  @Roles(UserRole.USER, UserRole.MANAGER, UserRole.STORE_OWNER, UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const coupon = await this.couponsService.findOne(id);
    if (!coupon) {
      throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Coupon retrieved successfully',
      coupon,
    };
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createCouponDto: CreateCouponDto,
  ) {
    const coupon = await this.couponsService.findOne(id);
    if (!coupon) {
      throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedCoupon = await this.couponsService.update(
        id,
        createCouponDto,
      );
      return {
        message: 'Coupon updated successfully',
        coupon: updatedCoupon,
      };
    } catch (error) {
      console.error('Error occurred while updating coupon:', error);
      throw new HttpException(
        'Failed to update coupon',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const coupon = await this.couponsService.findOne(id);
    if (!coupon) {
      throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);
    }
    await this.couponsService.remove(id);
    return {
      message: 'Coupon deleted successfully',
    };
  }
}
