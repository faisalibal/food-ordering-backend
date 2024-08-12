import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [GuestService, PrismaService],
  controllers: [GuestController],
})
export class GuestModule {}
