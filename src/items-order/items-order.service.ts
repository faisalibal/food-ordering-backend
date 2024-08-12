import { Injectable } from '@nestjs/common';
import { ItemOrder, ItemStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ItemOrderGateway } from './item-order.gateway';

@Injectable()
export class ItemOrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemOrderGateway: ItemOrderGateway,
  ) {}

  async createItemOrder(data: Prisma.ItemOrderCreateInput): Promise<ItemOrder> {
    // return this.prisma.itemOrder.create({ data });
    const newItemOrder = await this.prisma.itemOrder.create({ data });

    // Emit event 'created' ke semua klien terhubung
    this.itemOrderGateway.server.emit('created', newItemOrder);

    return newItemOrder;
  }

  async getStatusItem(): Promise<ItemStatus[]> {
    return this.prisma.itemStatus.findMany();
  }

  async createItemOrderMany(
    data: Prisma.ItemOrderCreateInput[],
  ): Promise<ItemOrder[]> {
    // const createManyPromises = data.map((item) =>
    //   this.prisma.itemOrder.create({ data: item }),
    // );
    // return Promise.all(createManyPromises);
    const createManyPromises = data.map(async (item) => {
      const newItemOrder = await this.prisma.itemOrder.create({
        data: item,
        include: { order: true },
      });

      // Emit event 'created' ke semua klien terhubung
      this.itemOrderGateway.server.emit('created', newItemOrder);

      return newItemOrder;
    });

    return Promise.all(createManyPromises);
  }

  async getOrder(): Promise<ItemOrder[]> {
    return this.prisma.itemOrder.findMany({
      include: {
        food: true, // Menyertakan data terkait dari model Food
        order: true, // Menyertakan data terkait dari model Order
      },
    });
  }

  async getItemOrderWaiters(): Promise<ItemOrder[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set jam menjadi 00:00:00:0000

    return this.prisma.itemOrder.findMany({
      where: {
        createdAt: {
          gte: today, // Filter untuk data yang dibuat setelah atau pada tanggal hari ini
        },
      },
      include: {
        food: true, // Menyertakan data terkait dari model Food
        order: true, // Menyertakan data terkait dari model Order
        status: true,
      },
    });
  }

  async getItemOrderById(id: number): Promise<ItemOrder | null> {
    return this.prisma.itemOrder.findUnique({ where: { id } });
  }

  async updateMultipleItemOrders(
    itemOrders: { id: number; data: Prisma.ItemOrderUpdateInput }[],
  ): Promise<ItemOrder[]> {
    // const updatedItemOrders: ItemOrder[] = [];

    // for (const itemOrder of itemOrders) {
    //   const { id, data } = itemOrder;
    //   const updatedItemOrder = await this.prisma.itemOrder.update({
    //     where: { id },
    //     data,
    //   });
    //   updatedItemOrders.push(updatedItemOrder);
    // }

    // return updatedItemOrders;
    const updatedItemOrders: ItemOrder[] = [];

    for (const itemOrder of itemOrders) {
      const { id, data } = itemOrder;
      const updatedItemOrder = await this.prisma.itemOrder.update({
        where: { id },
        data,
        include: { order: true },
      });

      // Emit event 'updated' ke semua klien terhubung
      this.itemOrderGateway.server.emit('updated', updatedItemOrder);
      updatedItemOrders.push(updatedItemOrder);
    }

    return updatedItemOrders;
  }

  async updateItemOrderStatus(
    id: number,
    newStatusId: number,
  ): Promise<ItemOrder | null> {
    // return this.prisma.itemOrder.update({
    //   where: { id: id },
    //   data: {
    //     statusId: newStatusId,
    //   },
    // });
    const updatedItemOrder = await this.prisma.itemOrder.update({
      where: { id },
      data: {
        statusId: newStatusId,
      },
      include: { order: true },
    });

    // const order = updatedItemOrder.order;
    // const allItemsCompleted = order.items.every((item) => item.statusId === 5);

    // if (allItemsCompleted) {
    //   // Update orderStatusId menjadi 2 pada Order
    //   await this.prisma.order.update({
    //     where: { id: order.id },
    //     data: { orderStatusId: 2 },
    //   });
    // }
    // Emit event 'updated' ke semua klien terhubung
    this.itemOrderGateway.server.emit('updated', updatedItemOrder);

    return updatedItemOrder;
  }

  async updateItemOrder(
    id: number,
    data: Prisma.ItemOrderUpdateInput,
  ): Promise<ItemOrder | null> {
    // return this.prisma.itemOrder.update({ where: { id }, data });
    const updatedItemOrder = await this.prisma.itemOrder.update({
      where: { id },
      data,
      include: { order: true },
    });

    // Emit event 'updated' ke semua klien terhubung
    this.itemOrderGateway.server.emit('updated', updatedItemOrder);

    return updatedItemOrder;
  }

  async deleteItemOrder(id: number): Promise<ItemOrder | null> {
    // return this.prisma.itemOrder.delete({ where: { id } });
    const deletedItemOrder = await this.prisma.itemOrder.delete({
      where: { id },
    });

    // Emit event 'deleted' ke semua klien terhubung
    this.itemOrderGateway.server.emit('deleted', deletedItemOrder);

    return deletedItemOrder;
  }

  // Metode lainnya dapat ditambahkan sesuai kebutuhan
}
