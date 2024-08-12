import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  const server = app.getHttpServer();
  const io = new socketio.Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173', 'http://192.168.120.146:5173'], // Ganti dengan daftar domain yang diizinkan
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    // credentials: true,
  };
  app.enableCors(corsOptions);
  await app.listen(9900);
}
bootstrap();
