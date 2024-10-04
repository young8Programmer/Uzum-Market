import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusHistoryController } from './order_status_history.controller';
import { OrderStatusHistoryService } from './order_status_history.service';

describe('OrderStatusHistoryController', () => {
  let controller: OrderStatusHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderStatusHistoryController],
      providers: [OrderStatusHistoryService],
    }).compile();

    controller = module.get<OrderStatusHistoryController>(OrderStatusHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
