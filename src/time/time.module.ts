import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TimeService, PrismaService],
  controllers: [TimeController],
})
export class TimeModule {}
