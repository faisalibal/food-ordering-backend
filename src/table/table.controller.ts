import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TableService } from './table.service';
import { Prisma, Table } from '@prisma/client';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  async create(
    @Body() createTableDto: Prisma.TableCreateInput,
  ): Promise<Table> {
    return this.tableService.create(createTableDto);
  }

  @Get()
  async findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Get('code/:id')
  async findById(@Param('id') id: string): Promise<Table | null> {
    return this.tableService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTableDto: Prisma.TableUpdateInput,
  ): Promise<Table> {
    return this.tableService.update(+id, updateTableDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Table> {
    return this.tableService.delete(+id);
  }
}
