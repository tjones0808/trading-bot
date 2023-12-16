import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { File, FileSchema } from './schemas/file.schema';


@Module({
  imports: [
    LoggerModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://cozz:cooldude@cluster0.nevjemp.mongodb.net/?retryWrites=true&w=majority',
    ),
    // MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
