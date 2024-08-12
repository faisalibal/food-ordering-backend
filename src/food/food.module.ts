import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

@Module({
  providers: [PrismaService, FoodService, JwtAuthService],
  controllers: [FoodController],
})
export class FoodModule {}
