import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [PrismaService, CustomerService, JwtService],
  controllers: [CustomerController],
})
export class CustomerModule {}
