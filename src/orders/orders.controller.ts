import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { Order, Prisma } from '@prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() orderData: Prisma.OrderCreateInput,
  ): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Get('guest/:guestId')
  async getOrderGuest(@Param('guestId') guestId: string) {
    const orders = await this.orderService.getOrderGuest(+guestId);
    return orders;
  }

  @Get()
  async getOrder(): Promise<Order[]> {
    return this.orderService.getOrder();
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string): Promise<Order | null> {
    return this.orderService.getOrderById(Number(orderId));
  }

  @Get('waiters/orders')
  async getOrderWaiters(): Promise<Order[]> {
    return this.orderService.getOrderWaiters();
  }

  @Get('chef/orders')
  async getOrderChef(): Promise<Order[]> {
    return this.orderService.getOrderChef();
  }

  @Get('chef/orders/work')
  async getOrderChefWork(): Promise<Order[]> {
    return this.orderService.getOrderChefWork();
  }

  @Put(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() orderData: Prisma.OrderUpdateInput,
  ): Promise<Order> {
    return this.orderService.updateOrder(Number(orderId), orderData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: string): Promise<Order> {
    return this.orderService.deleteOrder(Number(orderId));
  }
}
