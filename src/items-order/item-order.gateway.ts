/* eslint-disable prettier/prettier */
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ItemOrderGateway {
  @WebSocketServer()
  server: Server;
}
