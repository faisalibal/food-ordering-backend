import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Prisma, Reservations } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationService) {}

  @Post()
  async createReservation(
    @Body() data: Prisma.ReservationsCreateInput,
  ): Promise<Reservations> {
    return this.reservationsService.createReservation(data);
  }

  @Get()
  async getAllReservations(): Promise<Reservations[]> {
    return this.reservationsService.getAllReservations();
  }

  @Get(':id')
  async getReservationById(
    @Param('id') id: string,
  ): Promise<Reservations | null> {
    return this.reservationsService.getReservationById(+id);
  }

  @Put(':id')
  async updateReservation(
    @Param('id') id: string,
    @Body() data: Reservations,
  ): Promise<Reservations | null> {
    return this.reservationsService.updateReservation(+id, data);
  }

  @Delete(':id')
  async deleteReservation(
    @Param('id') id: string,
  ): Promise<Reservations | null> {
    return this.reservationsService.deleteReservation(+id);
  }
}
