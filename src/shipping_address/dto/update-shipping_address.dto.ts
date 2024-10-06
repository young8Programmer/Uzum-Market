import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingAddressDto } from './create-shipping_address.dto';

export class UpdateShippingAddressDto extends PartialType(
  CreateShippingAddressDto,
) {}
