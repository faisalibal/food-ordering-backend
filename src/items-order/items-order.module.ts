import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ItemOrderService } from './items-order.service';
import { ItemOrderController } from './items-order.controller';
import { ItemOrderGateway } from './item-order.gateway';

@Module({
  providers: [ItemOrderService, PrismaService, ItemOrderGateway],
  controllers: [ItemOrderController],
})
export class ItemsOrderModule {}
