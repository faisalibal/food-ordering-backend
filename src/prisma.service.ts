/* eslint-disable prettier/prettier */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private socketServer: Server;

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  setSocketServer(socketServer: Server) {
    this.socketServer = socketServer;
  }
}
