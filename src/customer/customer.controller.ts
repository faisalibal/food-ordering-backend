import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  LoginCustomerDto,
  RegisterCustomerDto,
} from 'src/DTO/food-ordering-dto';
import { Customer } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('register')
  async registerCustomer(
    @Body() registerCustomerDto: RegisterCustomerDto,
  ): Promise<Customer> {
    const createdCustomer = await this.customerService.registerCustomer(
      registerCustomerDto,
    );
    return createdCustomer;
  }

  @Post('login')
  async loginCustomer(
    @Body() loginCustomerDto: LoginCustomerDto,
  ): Promise<{ accessToken: string }> {
    const token = await this.customerService.loginCustomer(loginCustomerDto);
    return token;
  }

  @Get()
  async getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: number): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }

  @Put(':id')
  // @UseGuards(AuthGuard('jwt'))
  async updateCustomer(
    @Param('id') id: number,
    @Body() updateData: Partial<Customer>,
    @Request() request: any,
  ): Promise<Customer> {
    const customerId = request.user.customer_id;
    if (id !== customerId) {
      throw new UnauthorizedException(
        'You are not authorized to update this customer',
      );
    }
    return this.customerService.updateCustomer(id, updateData);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  async deleteCustomer(
    @Param('id') id: number,
    @Request() request: any,
  ): Promise<void> {
    const customerId = request.user.customer_id;

    // Periksa apakah pengguna saat ini memiliki akses untuk menghapus pelanggan
    // Misalnya, hanya pelanggan itu sendiri yang dapat menghapus akunnya
    if (id !== customerId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this customer',
      );
    }

    // Hapus pelanggan
    await this.customerService.deleteCustomer(id);
  }
}
