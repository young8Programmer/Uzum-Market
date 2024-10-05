import { Test, TestingModule } from '@nestjs/testing';
import { ShippingAddressService } from './shipping_address.service';

describe('ShippingAddressService', () => {
  let service: ShippingAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingAddressService],
    }).compile();

    service = module.get<ShippingAddressService>(ShippingAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
