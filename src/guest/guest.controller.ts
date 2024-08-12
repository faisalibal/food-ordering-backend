import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest } from '@prisma/client';
import { CreateGuestDto } from 'src/DTO/food-ordering-dto';

@Controller('guest')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Post()
  create(@Body() data: CreateGuestDto): Promise<Guest> {
    return this.guestService.create(data);
  }

  @Get()
  findAll(): Promise<Guest[]> {
    return this.guestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Guest | null> {
    return this.guestService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Guest): Promise<Guest | null> {
    return this.guestService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Guest | null> {
    return this.guestService.remove(+id);
  }
}
