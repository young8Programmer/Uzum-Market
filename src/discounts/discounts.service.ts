import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountsRepository: Repository<Discount>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const discount = this.discountsRepository.create(createDiscountDto);
    return this.discountsRepository.save(discount);
  }

  async findAll(): Promise<Discount[]> {
    return this.discountsRepository.find();
  }

  async findOne(id: number): Promise<Discount> {
    return this.discountsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.discountsRepository.delete(id);
  }

  async update(
    id: number,
    updateDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    await this.discountsRepository.update(id, updateDiscountDto);
    return this.findOne(id);
  }
}
