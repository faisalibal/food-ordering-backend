import { Injectable } from '@nestjs/common';
import { PhoneCode, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PhoneCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PhoneCode[]> {
    return this.prisma.phoneCode.findMany({});
  }

  async createMany(data: Prisma.PhoneCodeCreateInput[]): Promise<PhoneCode[]> {
    const createManyPromises = data.map((item) =>
      this.prisma.phoneCode.create({ data: item }),
    );
    return Promise.all(createManyPromises);
  }

  async update(
    id: number,
    data: Prisma.PhoneCodeUpdateInput,
  ): Promise<PhoneCode | null> {
    return this.prisma.phoneCode.update({ where: { id }, data });
  }

  async delete(id: number): Promise<PhoneCode | null> {
    return this.prisma.phoneCode.delete({ where: { id } });
  }
}
