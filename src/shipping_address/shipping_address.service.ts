import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShippingAddressDto } from './dto/create-shipping_address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping_address.dto';
import { ShippingAddress } from './entities/shipping_address.entity';

@Injectable()
export class ShippingAddressService {
  constructor(
    @InjectRepository(ShippingAddress)
    private readonly shippingAddressRepository: Repository<ShippingAddress>,
  ) {}

  async create(
    createShippingAddressDto: CreateShippingAddressDto,
  ): Promise<ShippingAddress> {
    const newShippingAddress = this.shippingAddressRepository.create(
      createShippingAddressDto,
    );
    return await this.shippingAddressRepository.save(newShippingAddress);
  }

  async findAll(): Promise<ShippingAddress[]> {
    return await this.shippingAddressRepository.find();
  }

  async findOne(id: number): Promise<ShippingAddress> {
    const shippingAddress = await this.shippingAddressRepository.findOne({
      where: { id },
    });
    if (!shippingAddress) {
      throw new NotFoundException(`Shipping address #${id} not found!`);
    }
    return shippingAddress;
  }

  async update(
    id: number,
    updateShippingAddressDto: UpdateShippingAddressDto,
  ): Promise<ShippingAddress> {
    const shippingAddress = await this.findOne(id);
    const updatedShippingAddress = Object.assign(
      shippingAddress,
      updateShippingAddressDto,
    );
    return await this.shippingAddressRepository.save(updatedShippingAddress);
  }

  async remove(id: number): Promise<void> {
    const result = await this.shippingAddressRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Shipping address #${id} not found!`);
    }
  }
}
