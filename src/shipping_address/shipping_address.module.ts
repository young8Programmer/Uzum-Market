import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping_address.service';
import { ShippingAddressController } from './shipping_address.controller';

@Module({
  providers: [ShippingAddressService],
  controllers: [ShippingAddressController]
})
export class ShippingAddressModule {}
