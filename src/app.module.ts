import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './reservation/reservation.module';
import { FoodModule } from './food/food.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { JwtStrategy } from './jwt-auth/jwt.strategy';
import { OrdersModule } from './orders/orders.module';
import { ItemsOrderModule } from './items-order/items-order.module';
import { GuestModule } from './guest/guest.module';
import { TableModule } from './table/table.module';
import { ItemOrderGateway } from './items-order/item-order.gateway';
import { WaiterscallModule } from './waiterscall/waiterscall.module';
import { PhoneCodeModule } from './phone-code/phone-code.module';
import { TimeModule } from './time/time.module';

// Load the .env file
dotenv.config();

@Module({
  imports: [
    ReservationModule,
    FoodModule,
    UserModule,
    CustomerModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 }, // Ganti dengan kunci rahasia yang aman
    }),
    OrdersModule,
    ItemsOrderModule,
    GuestModule,
    TableModule,
    WaiterscallModule,
    PhoneCodeModule,
    TimeModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthService, JwtStrategy, ItemOrderGateway],
  exports: [JwtAuthService, ItemOrderGateway],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwtAuthGuardMiddleware).forRoutes('*'); // Menerapkan middleware untuk semua rute
//     // Atau spesifik rute
//     // consumer.apply(JwtAuthGuardMiddleware).forRoutes('protected-route');
//   }
// }
// export class AppModule {}
