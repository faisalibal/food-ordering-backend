import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
// import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import {
  LoginCustomerDto,
  RegisterCustomerDto,
} from 'src/DTO/food-ordering-dto';
import { Customer } from '@prisma/client';
import { JwtPayload } from 'src/DTO/jwt-payload';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async registerCustomer(
    registerCustomerDto: RegisterCustomerDto,
  ): Promise<Customer> {
    const { email, phone_number, password } = registerCustomerDto;

    // Check if the email or phone number is already registered
    const existingCustomer = await this.prisma.customer.findFirst({
      where: {
        OR: [{ email: email }, { phone_number: phone_number }],
      },
    });

    if (existingCustomer) {
      throw new ConflictException(
        'Email or phone number is already registered',
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new customer
    const createdCustomer = await this.prisma.customer.create({
      data: {
        customer_name: registerCustomerDto.customer_name,
        email,
        phone_number,
        password: hashedPassword,
      },
    });

    return createdCustomer;
  }

  async loginCustomer(loginCustomerDto: LoginCustomerDto): Promise<any> {
    const { email, passwordLogin } = loginCustomerDto;

    // Find the customer by email
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(
      passwordLogin,
      customer.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return the JWT token
    const payload: JwtPayload = {
      customer_id: customer.customer_id,
      email: customer.email,
      phone_number: customer.phone_number,
      customer_name: customer.customer_name,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    const { password, ...detailCustomer } = customer;

    const loginData = {
      detailCustomer,
      accessToken,
    };

    return { loginData };
  }

  async getCustomers(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async getCustomerById(customerId: number): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { customer_id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async updateCustomer(
    customerId: number,
    updateData: Partial<Customer>,
  ): Promise<Customer> {
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { customer_id: customerId },
    });

    if (!existingCustomer) {
      throw new NotFoundException('Customer not found');
    }

    const updatedCustomer = await this.prisma.customer.update({
      where: { customer_id: customerId },
      data: updateData,
    });

    return updatedCustomer;
  }

  async deleteCustomer(customerId: number): Promise<void> {
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { customer_id: customerId },
    });

    if (!existingCustomer) {
      throw new NotFoundException('Customer not found');
    }

    await this.prisma.customer.delete({ where: { customer_id: customerId } });
  }
}
