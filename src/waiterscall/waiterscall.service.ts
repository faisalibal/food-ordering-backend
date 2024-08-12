import { Injectable } from '@nestjs/common';
import { Prisma, WaitersCalls } from '@prisma/client';
import { ItemOrderGateway } from 'src/items-order/item-order.gateway';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WaitersCallsService {
  constructor(
    private prisma: PrismaService,
    private readonly itemOrderGateway: ItemOrderGateway,
  ) {}

  async getAllWaitersCalls(): Promise<WaitersCalls[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.prisma.waitersCalls.findMany({
      where: {
        createdAt: {
          gte: today,
        },
        action: false,
      },
      include: {
        table: true,
      },
    });
  }

  async getWaitersCallById(id: number): Promise<WaitersCalls | null> {
    return this.prisma.waitersCalls.findUnique({
      where: { id },
      include: {
        table: true,
      },
    });
  }

  async createWaitersCall(
    data: Prisma.WaitersCallsCreateInput,
  ): Promise<WaitersCalls> {
    const newWaitersCall = await this.prisma.waitersCalls.create({
      data,
      include: {
        table: true,
      },
    });

    this.itemOrderGateway.server.emit('createdWaiters', newWaitersCall);

    return newWaitersCall;
  }

  async updateWaitersCall(
    id: number,
    data: Prisma.WaitersCallsUpdateInput,
  ): Promise<WaitersCalls | null> {
    const updatedWaitersCall = await this.prisma.waitersCalls.update({
      where: { id },
      data,
      include: {
        table: true,
      },
    });

    this.itemOrderGateway.server.emit('updatedWaiters', updatedWaitersCall);

    return updatedWaitersCall;
  }

  async deleteWaitersCall(id: number): Promise<WaitersCalls | null> {
    const deletedWaitersCall = await this.prisma.waitersCalls.delete({
      where: { id },
    });

    this.itemOrderGateway.server.emit('deletedWaiters', deletedWaitersCall);

    return deletedWaitersCall;
  }
}
