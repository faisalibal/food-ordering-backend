import { Injectable } from '@nestjs/common';
import { Guest, Prisma } from '@prisma/client';
import { CreateGuestDto } from 'src/DTO/food-ordering-dto';
import { ErrorController } from 'src/errors/error.controller';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GuestService extends ErrorController {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(data: CreateGuestDto): Promise<Guest> {
    try {
      return this.prisma.guest.create({ data });
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(): Promise<Guest[]> {
    return this.prisma.guest.findMany();
  }

  async findOne(id: number): Promise<Guest | null> {
    return this.prisma.guest.findUnique({ where: { guest_id: id } });
  }

  async update(
    id: number,
    data: Prisma.GuestUpdateInput,
  ): Promise<Guest | null> {
    return this.prisma.guest.update({ where: { guest_id: id }, data });
  }

  async remove(id: number): Promise<Guest | null> {
    return this.prisma.guest.delete({ where: { guest_id: id } });
  }
}
