import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';;
import { BrandsModule } from './brands/brands.module';
import { CarInventoryModule } from './car_invertory/car_invertory.module';
import { CarModule } from './car/car.module';
import { PartnersModule } from './partners/partners.module';
import { BranchesModule } from './branches/branches.module';
import { EmployeesModule } from './employees/employees.module';
import { ServicesModule } from './services/services.module';
import { AdminModule } from './admin/admin.module';
import { Client } from './clients/models/client.model';
import { AuthModule } from './auth/auth.module';
import { CarFinancingModule } from './car_financing/car_financing.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { PaymentsModule } from './payments/payments.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CustomerSupportModule } from './customer_support/customer_support.module';
import { CartModule } from './cart/cart.module';
import { MailModule } from './mail/mail.module';
import { Brand } from './brands/models/brand.model';
import { Branch } from './branches/models/branch.model';
import { CarInventory } from './car_invertory/models/car_invertory.model';
import { Car } from './car/models/car.model';
import { Partner } from './partners/models/partner.model';
import { Employee } from './employees/models/employee.model';
import { Service } from './services/models/service.model';
import { CarFinancing } from './car_financing/models/car_financing.entity';
import { Order } from './orders/models/order.model';
import { Delivery } from './deliveries/models/delivery.model';
import { Payment } from './payments/models/payment.model';
import { Wishlist } from './wishlist/models/wishlist.model';
import { Notification } from './notifications/models/notification.model';
import { CustomerSupport } from './customer_support/models/customer_support.model';
import { Cart } from './cart/models/cart.model';
import { ClientModule } from './clients/client.module';
import { Otp } from './auth/models/otp.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: +process.env.POSTGRES_PORT || 5432,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "root",
      database: process.env.POSTGRES_DB || "first_motors",
      models: [
        Brand,
        Branch,
        CarInventory,
        Car,
        Partner,
        Employee,
        Service,
        CarFinancing,
        Order,
        Delivery,
        Payment,
        Wishlist,
        Notification,
        CustomerSupport,
        Cart,
        Client,
        Otp,
      ],
      logging: false,
      autoLoadModels: true,
      sync: { alter: true },
    }),
    BrandsModule,
    CarInventoryModule,
    CarModule,
    PartnersModule,
    BranchesModule,
    EmployeesModule,
    ServicesModule,
    AdminModule,
    ClientModule,
    AuthModule,
    CarFinancingModule,
    OrdersModule,
    DeliveriesModule,
    PaymentsModule,
    WishlistModule,
    NotificationsModule,
    CustomerSupportModule,
    CartModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
