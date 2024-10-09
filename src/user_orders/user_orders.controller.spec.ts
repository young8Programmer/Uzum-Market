import { Test, TestingModule } from '@nestjs/testing';
import { UserOrdersController } from './user_orders.controller';
import { UserOrdersService } from './user_orders.service';

describe('UserOrdersController', () => {
  let controller: UserOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOrdersController],
      providers: [UserOrdersService],
    }).compile();

    controller = module.get<UserOrdersController>(UserOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
