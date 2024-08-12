import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ItemOrderService } from './items-order.service';
import { ItemOrder, ItemStatus, Prisma } from '@prisma/client';

@Controller('item-order')
export class ItemOrderController {
  constructor(private readonly itemOrderService: ItemOrderService) {}

  @Post()
  async createItemOrder(
    @Body() data: Prisma.ItemOrderCreateInput,
  ): Promise<ItemOrder> {
    return this.itemOrderService.createItemOrder(data);
  }

  @Post('many')
  async createMany(
    @Body() data: Prisma.ItemOrderCreateInput[],
  ): Promise<ItemOrder[]> {
    return this.itemOrderService.createItemOrderMany(data);
  }

  @Patch('update-many')
  async updateMultipleItemOrders(
    @Body() itemOrders: { id: number; data: Prisma.ItemOrderUpdateInput }[],
  ): Promise<ItemOrder[]> {
    return this.itemOrderService.updateMultipleItemOrders(itemOrders);
  }

  @Put('status/:id')
  async updateItemOrderStatus(
    @Param('id') id: string,
    @Body('statusId') newStatusId: number,
  ): Promise<ItemOrder | null> {
    return this.itemOrderService.updateItemOrderStatus(+id, newStatusId);
  }

  @Get()
  async getOrder(): Promise<ItemOrder[]> {
    return this.itemOrderService.getOrder();
  }

  @Get('waiters/item-order')
  async getItemOrderWaiters(): Promise<ItemOrder[]> {
    return this.itemOrderService.getItemOrderWaiters();
  }

  @Get('item/status')
  async getStatusItem(): Promise<ItemStatus[]> {
    return this.itemOrderService.getStatusItem();
  }

  @Get(':id')
  async getItemOrderById(@Param('id') id: number): Promise<ItemOrder | null> {
    return this.itemOrderService.getItemOrderById(id);
  }

  @Put(':id')
  async updateItemOrder(
    @Param('id') id: number,
    @Body() data: ItemOrder,
  ): Promise<ItemOrder | null> {
    return this.itemOrderService.updateItemOrder(id, data);
  }

  @Delete(':id')
  async deleteItemOrder(@Param('id') id: number): Promise<ItemOrder | null> {
    return this.itemOrderService.deleteItemOrder(id);
  }
}
