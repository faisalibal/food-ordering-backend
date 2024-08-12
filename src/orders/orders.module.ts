import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, OrderService],
  controllers: [OrderController],
})
export class OrdersModule {}
