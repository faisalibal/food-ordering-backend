import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PhoneCodeService } from './phone-code.service';
import { PhoneCode, Prisma } from '@prisma/client';

@Controller('phone-code')
export class PhoneCodeController {
  constructor(private readonly phoneCodeService: PhoneCodeService) {}

  @Get()
  async findAll(): Promise<PhoneCode[]> {
    return this.phoneCodeService.findAll();
  }

  @Post('many')
  async createMany(
    @Body() data: Prisma.PhoneCodeCreateInput[],
  ): Promise<PhoneCode[]> {
    return this.phoneCodeService.createMany(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Prisma.FoodUpdateInput,
  ): Promise<PhoneCode | null> {
    return this.phoneCodeService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<PhoneCode | null> {
    return this.phoneCodeService.delete(id);
  }
}
