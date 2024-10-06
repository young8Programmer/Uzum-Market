import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  private readonly coupons: Coupon[] = [];

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const coupon: Coupon = {
      id: Date.now(),
      ...createCouponDto,
    };
    this.coupons.push(coupon);
    return coupon;
  }

  async findAll(): Promise<Coupon[]> {
    return this.coupons;
  }

  async findOne(id: number): Promise<Coupon | undefined> {
    return this.coupons.find((coupon) => coupon.id === id);
  }

  async update(id: number, updateData: CreateCouponDto): Promise<Coupon> {
    const index = this.coupons.findIndex((coupon) => coupon.id === id);
    if (index === -1) {
      throw new NotFoundException('Kupon topilmadi');
    }
    this.coupons[index] = { ...this.coupons[index], ...updateData };
    return this.coupons[index];
  }

  async remove(id: number): Promise<void> {
    const index = this.coupons.findIndex((coupon) => coupon.id === id);
    if (index === -1) {
      throw new NotFoundException('Kupon topilmadi');
    }
    this.coupons.splice(index, 1);
  }
}
