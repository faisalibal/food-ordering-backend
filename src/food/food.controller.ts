import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { Food, FoodSpicyLevel, FoodCategory, Prisma } from '@prisma/client';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

@Controller('foods')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Get()
  async findAll(@Headers('authorization') authHeader): Promise<Food[]> {
    // this.jwtAuthService.verifyTokenFromHeader(authHeader);
    return this.foodService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Food | null> {
    return this.foodService.findById(id);
  }

  @Post()
  async create(@Body() data: Prisma.FoodCreateInput): Promise<Food> {
    return this.foodService.create(data);
  }

  @Post('many')
  async createMany(@Body() data: Prisma.FoodCreateInput[]): Promise<Food[]> {
    return this.foodService.createMany(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Prisma.FoodUpdateInput,
  ): Promise<Food | null> {
    return this.foodService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Food | null> {
    return this.foodService.delete(id);
  }

  @Get('data/spicy-levels')
  async getSpicyLevels(): Promise<FoodSpicyLevel[]> {
    return this.foodService.getSpicyLevels();
  }

  @Get('data/categories')
  async getCategories(): Promise<FoodCategory[]> {
    return this.foodService.getCategories();
  }
}
