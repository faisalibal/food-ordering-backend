import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { PrismaService } from 'src/prisma.service';
import { ReservationsController } from './reservation.controller';

@Module({
  providers: [ReservationService, PrismaService],
  controllers: [ReservationsController],
})
export class ReservationModule {}
