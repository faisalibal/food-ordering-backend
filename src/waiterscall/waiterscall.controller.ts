import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { WaitersCallsService } from './waiterscall.service';
import { Prisma, WaitersCalls } from '@prisma/client';

@Controller('waiters-calls')
export class WaitersCallsController {
  constructor(private waitersCallsService: WaitersCallsService) {}

  @Get()
  async getAllWaitersCalls(): Promise<WaitersCalls[]> {
    return this.waitersCallsService.getAllWaitersCalls();
  }

  @Get(':id')
  async getWaitersCallById(
    @Param('id') id: number,
  ): Promise<WaitersCalls | null> {
    return this.waitersCallsService.getWaitersCallById(id);
  }

  @Post()
  async createWaitersCall(
    @Body() data: Prisma.WaitersCallsCreateInput,
  ): Promise<WaitersCalls> {
    return this.waitersCallsService.createWaitersCall(data);
  }

  @Patch(':id')
  async updateWaitersCall(
    @Param('id') id: number,
    @Body() data: Prisma.WaitersCallsUpdateInput,
  ): Promise<WaitersCalls | null> {
    return this.waitersCallsService.updateWaitersCall(id, data);
  }

  @Delete(':id')
  async deleteWaitersCall(
    @Param('id') id: number,
  ): Promise<WaitersCalls | null> {
    return this.waitersCallsService.deleteWaitersCall(id);
  }
}
