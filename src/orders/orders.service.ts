import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  async getOrder(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async getOrderChef(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            food: true,
            status: true,
          },
        },
        orderStatus: true, // Menyertakan data dari tabel 'orderStatus'
        guest: true, // Menyertakan data dari tabel 'guest'
        customer: true, // Menyertakan data dari tabel 'customer'
        table: true,
      },
    });
  }

  async getOrderChefWork(): Promise<Order[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: today,
        },
      },
      include: {
        items: {
          include: {
            food: true,
            status: true,
          },
        },
        orderStatus: true, // Menyertakan data dari tabel 'orderStatus'
        guest: true, // Menyertakan data dari tabel 'guest'
        customer: true, // Menyertakan data dari tabel 'customer'
        table: true,
      },
    });
  }

  async getOrderGuest(guestId: number): Promise<Order> {
    const orders = await this.prisma.order.findMany({
      where: {
        guestId,
        orderStatusId: { not: 2 }, // Menyaring orderStatusId yang bukan 2
      },
      include: {
        items: {
          include: {
            food: true,
            status: true,
          },
        },
      },
      orderBy: { id: 'desc' }, // Mengurutkan berdasarkan id order secara menurun (terakhir pertama)
      take: 1, // Mengambil hanya 1 order
    });
    return orders[0];
  }

  async getOrderWaiters(): Promise<Order[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Mengatur jam ke 00:00:00
    console.log('tes');

    return this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: today, // Mencari data yang memiliki createdAt lebih besar atau sama dengan hari ini
        },
        orderStatusId: {
          not: 2, // Mencari data yang orderStatusId-nya bukan 2
        },
      },
      include: {
        items: {
          include: {
            food: true,
            status: true,
          },
        }, // Menyertakan data dari tabel 'items'
        orderStatus: true, // Menyertakan data dari tabel 'orderStatus'
        guest: true, // Menyertakan data dari tabel 'guest'
        customer: true, // Menyertakan data dari tabel 'customer'
        table: true,
      },
    });
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            food: true,
            status: true,
          },
        }, // Menyertakan data dari tabel 'items'
        orderStatus: true, // Menyertakan data dari tabel 'orderStatus'
        guest: true, // Menyertakan data dari tabel 'guest'
        customer: true, // Menyertakan data dari tabel 'customer'
        table: true,
      },
    });
  }

  async updateOrder(
    orderId: number,
    data: Prisma.OrderUpdateInput,
  ): Promise<Order> {
    return this.prisma.order.update({ where: { id: orderId }, data });
  }

  async deleteOrder(orderId: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id: orderId } });
  }
}
