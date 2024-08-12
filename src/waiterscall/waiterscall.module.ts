import { Module } from '@nestjs/common';
import { WaitersCallsService } from './waiterscall.service';
import { PrismaService } from 'src/prisma.service';
import { WaitersCallsController } from './waiterscall.controller';
import { ItemOrderGateway } from 'src/items-order/item-order.gateway';

@Module({
  providers: [WaitersCallsService, PrismaService, ItemOrderGateway],
  controllers: [WaitersCallsController],
})
export class WaiterscallModule {}
