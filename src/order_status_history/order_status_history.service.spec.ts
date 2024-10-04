import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusHistoryService } from './order_status_history.service';

describe('OrderStatusHistoryService', () => {
  let service: OrderStatusHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderStatusHistoryService],
    }).compile();

    service = module.get<OrderStatusHistoryService>(OrderStatusHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
