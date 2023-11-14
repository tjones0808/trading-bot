import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport,  } from '@nestjs/microservices';
import { LoggerModule } from 'nestjs-pino';

import { BookController } from './api/bookstore.controller';
import mainConfig from './config/main.config';
import { AuthStrategy } from './auth/auth.strategy';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';


@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // The configuration will be available in every module
      load: [mainConfig], // Load custom configuration settings
      cache: true, // Load configuration settings from cache
      // envFilePath: '.env', // Specify the path to your .env file if not in root
      // ignoreEnvFile: process.env.NODE_ENV === 'production', // Ignore .env file in production
      // validationSchema: Joi.object({ ... }), // If you're using Joi for validation
    }), // for environment variables
    FileModule
  ],
  controllers: [BookController],
  providers: [{
    provide: 'BOOKS_SERVICE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.get('BOOKSTORE_SERVICE_HOST'),
          port: configService.get('BOOKSTORE_SERVICE_PORT')
        }
      })
    }
    }, AuthStrategy],
})
export class AppModule {}
