import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { join } from 'path';
import { protobufPackage } from './file/file.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
  bufferLogs: true,
  transport: Transport.GRPC,
  options: {
      package: protobufPackage,
      protoPath: join('node_modules/heredity-protos/proto/file.proto'),
      url: '0.0.0.0:50052',
      maxReceiveMessageLength: 10 * 1024 * 1024, // for 10MB
      maxSendMessageLength: 10 * 1024 * 1024 // for 10MB
  }
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true}));
  app.useLogger(app.get(Logger));

  await app.listen();
}

bootstrap();
