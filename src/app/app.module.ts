
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';
import { PaymentModule } from 'src/payments/payments.module';
import { Order } from 'src/order/entities/order.entity';
import { AboutUs } from 'src/about_us/entities/about_us.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { OrderStatusHistory } from 'src/order_status_history/entities/order_status_history.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { ShippingAddress } from 'src/shipping_address/entities/shipping_address.entity';
import { User } from 'src/user/entities/user.entity';
import { AboutUsModule } from 'src/about_us/about_us.module';
import { AdminModule } from 'src/admin/admin.module';
import { CartModule } from 'src/cart/cart.module';
import { CartItemsModule } from 'src/cart_items/cart_items.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { OrderItemsModule } from 'src/order_items/order_items.module';
import { OrderStatusHistoryModule } from 'src/order_status_history/order_status_history.module';
import { ProductsModule } from 'src/products/products.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { ShippingAddressModule } from 'src/shipping_address/shipping_address.module';
import { UserModule } from 'src/user/user.module';
import { UserOrder } from 'src/user_orders/entities/user_order.entity';
import { UserOrdersModule } from 'src/user_orders/user_orders.module';
import { Discount } from 'src/discounts/entities/discount.entity';
import { DiscountsModule } from 'src/discounts/discounts.module';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { CouponsModule } from 'src/coupons/coupons.module';
import { AuthModule } from 'src/auth/auth.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { JwtModule } from '@nestjs/jwt';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Vali336699",
      database: "uzum_market",
      entities: [
        Order,
        AboutUs,
        Admin,
        Cart,
        CartItem,
        Category,
        OrderItem,
        OrderStatusHistory,
        Payment,
        Product,
        Review,
        ShippingAddress,
        User,
        UserOrder,
        Discount,
        Coupon,
        Auth,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "./src/uploads"),
    }),
    OrderModule,
    PaymentModule,
    AboutUsModule,
    AdminModule,
    CartModule,
    CartItemsModule,
    CategoriesModule,
    OrderItemsModule,
    OrderStatusHistoryModule,
    ProductsModule,
    ReviewsModule,
    ShippingAddressModule,
    UserModule,
    UserOrdersModule,
    DiscountsModule,
    CouponsModule,
    AuthModule,
    JwtModule.register({
      secret: "judayam_secret_key",
      signOptions: { expiresIn: "1h" }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
