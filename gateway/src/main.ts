import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet());

  // Rate limiting middleware for Express.
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Heredity API Gateway')
    .setDescription('The API Gateway interface for Heredity services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS setup
  app.enableCors();
  app.useLogger(app.get(Logger));

  await app.listen(3001);
}

bootstrap();
