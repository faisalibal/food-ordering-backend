import { Injectable } from '@nestjs/common';
import { Prisma, Reservations } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async createReservation(
    data: Prisma.ReservationsCreateInput,
  ): Promise<Reservations> {
    return this.prisma.reservations.create({
      data,
    });
  }

  async getAllReservations(): Promise<Reservations[]> {
    return this.prisma.reservations.findMany();
  }

  async getReservationById(id: number): Promise<Reservations | null> {
    return this.prisma.reservations.findUnique({
      where: { reservation_id: id },
    });
  }

  async updateReservation(
    id: number,
    data: Reservations,
  ): Promise<Reservations | null> {
    return this.prisma.reservations.update({
      where: { reservation_id: id },
      data,
    });
  }

  async deleteReservation(id: number): Promise<Reservations | null> {
    return this.prisma.reservations.delete({
      where: { reservation_id: id },
    });
  }
}
