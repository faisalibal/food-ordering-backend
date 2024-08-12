import { Injectable } from '@nestjs/common';
import { Prisma, Table } from '@prisma/client';
import EntityNotFoundError from 'src/errors/entity-notfound.error';
import { ErrorController } from 'src/errors/error.controller';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TableService extends ErrorController {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(data: Prisma.TableCreateInput): Promise<Table> {
    try {
      return this.prisma.table.create({ data });
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(): Promise<Table[]> {
    try {
      return this.prisma.table.findMany();
    } catch (error) {
      this.handleException(error);
    }
  }

  async findById(id: string): Promise<Table | null> {
    try {
      const table = await this.prisma.table.findUnique({
        where: { unique_code: id },
      });

      if (table === null) {
        throw new EntityNotFoundError('Table not found');
      }

      if (table.statusId === 1) {
        throw new EntityNotFoundError('Table has been reserved');
      }

      return table;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: number, data: Prisma.TableUpdateInput): Promise<Table> {
    try {
      return await this.prisma.table.update({ where: { id }, data });
    } catch (error) {
      this.handleException(error);
    }
  }

  async delete(id: number): Promise<Table> {
    try {
      return this.prisma.table.delete({ where: { id } });
    } catch (error) {
      this.handleException(error);
    }
  }
}
