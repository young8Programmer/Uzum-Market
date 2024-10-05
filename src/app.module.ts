import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'
import { AdminModule } from './admin/admin.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsModule } from './order_items/order_items.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrderStatusHistoryModule } from './order_status_history/order_status_history.module';
import { Order } from './order/entities/order.entity';
import { Cart } from './cart/entities/cart.entity';

import { CartItemsModule } from './cart_items/cart_items.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '4545',
      database: 'uzum',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, }),
    UserModule,
    AdminModule,
    OrderItemsModule,
    CartModule,
    OrderModule,

    Order,
    Cart,
    PaymentModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    OrderStatusHistoryModule,
    CartItemsModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
