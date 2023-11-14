import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILE_SERVICE_NAME, APP_PACKAGE_NAME } from './file.pb';
import { FileController } from './file.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: APP_PACKAGE_NAME,
          protoPath: 'node_modules/heredity-protos/proto/file.proto',
        },
      },
    ]),
  ],
  controllers: [FileController],
})
export class FileModule {}
