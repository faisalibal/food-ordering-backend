import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TimeService } from './time.service';
import { Prisma, Time } from '@prisma/client';

@Controller('times')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Post()
  async createTime(@Body() data: Prisma.TimeCreateInput): Promise<Time> {
    return this.timeService.createTime(data);
  }

  @Get()
  async getAllTimes(): Promise<Time[]> {
    return this.timeService.getAllTimes();
  }

  @Get(':id')
  async getTimeById(@Param('id') id: string): Promise<Time | null> {
    return this.timeService.getTimeById(+id);
  }

  @Put(':id')
  async updateTime(
    @Param('id') id: string,
    @Body() data: Time,
  ): Promise<Time | null> {
    return this.timeService.updateTime(+id, data);
  }

  @Delete(':id')
  async deleteTime(@Param('id') id: string): Promise<Time | null> {
    return this.timeService.deleteTime(+id);
  }
}
