import { Test, TestingModule } from '@nestjs/testing';
import { UserOrdersService } from './user_orders.service';

describe('UserOrdersService', () => {
  let service: UserOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOrdersService],
    }).compile();

    service = module.get<UserOrdersService>(UserOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
