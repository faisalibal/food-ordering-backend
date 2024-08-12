import { Injectable } from '@nestjs/common';
import { Prisma, Time } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TimeService {
  constructor(private prisma: PrismaService) {}

  async createTime(data: Prisma.TimeCreateInput): Promise<Time> {
    return this.prisma.time.create({
      data,
    });
  }

  async getAllTimes(): Promise<Time[]> {
    return this.prisma.time.findMany();
  }

  async getTimeById(id: number): Promise<Time | null> {
    return this.prisma.time.findUnique({
      where: { time_id: id },
    });
  }

  async updateTime(id: number, data: Time): Promise<Time | null> {
    return this.prisma.time.update({
      where: { time_id: id },
      data,
    });
  }

  async deleteTime(id: number): Promise<Time | null> {
    return this.prisma.time.delete({
      where: { time_id: id },
    });
  }
}
