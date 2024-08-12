import { Injectable } from '@nestjs/common';
import { Food, FoodSpicyLevel, FoodCategory, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Food[]> {
    return this.prisma.food.findMany({
      include: {
        category: true, // Menyertakan data terkait dari model Food
        spicy_level: true, // Menyertakan data terkait dari model Order
      },
    });
  }

  async findById(id: string): Promise<Food | null> {
    const foodId = parseInt(id);
    return this.prisma.food.findUnique({ where: { id: foodId } });
  }

  async create(data: Prisma.FoodCreateInput): Promise<Food> {
    return this.prisma.food.create({ data });
  }

  async createMany(data: Prisma.FoodCreateInput[]): Promise<Food[]> {
    const createManyPromises = data.map((item) =>
      this.prisma.food.create({ data: item }),
    );
    return Promise.all(createManyPromises);
  }

  async update(id: number, data: Prisma.FoodUpdateInput): Promise<Food | null> {
    return this.prisma.food.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Food | null> {
    return this.prisma.food.delete({ where: { id } });
  }

  async getSpicyLevels(): Promise<FoodSpicyLevel[]> {
    return this.prisma.foodSpicyLevel.findMany();
  }

  async getCategories(): Promise<FoodCategory[]> {
    return this.prisma.foodCategory.findMany();
  }
}
