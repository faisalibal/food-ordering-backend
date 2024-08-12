import { Module } from '@nestjs/common';
import { PhoneCodeService } from './phone-code.service';
import { PhoneCodeController } from './phone-code.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PhoneCodeService, PrismaService],
  controllers: [PhoneCodeController],
})
export class PhoneCodeModule {}
