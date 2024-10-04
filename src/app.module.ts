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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Vali336699',
      database: 'n9',
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
    ReviewsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
