import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddressService } from './shipping_address.service';
import { ShippingAddressController } from './shipping_address.controller';
import { ShippingAddress } from './entities/shipping_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingAddress])],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService],
})
export class ShippingAddressModule {}
