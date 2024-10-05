import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'
import { AdminModule } from './admin/admin.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/entities/order.entity';
import { Cart } from './cart/entities/cart.entity';
import { PaymentModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { CartItemsModule } from './cart_items/cart_items.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,

    }),
    UserModule,
    AdminModule,
    Order,
    Cart,
    PaymentModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    CartItemsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
