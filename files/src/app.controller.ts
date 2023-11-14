import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

import { AppService } from './app.service';
import { FILE_SERVICE_NAME, UploadResponse } from './file/file.pb';
import { UploadFileDto } from './file/file.dto';

@Controller()
export class AppController {
  constructor(@InjectPinoLogger(AppController.name) private readonly logger: PinoLogger) {}

  @Inject(AppService) private readonly appService: AppService;
  
  @GrpcMethod(FILE_SERVICE_NAME, 'uploadFile')
  private async uploadFile(data: UploadFileDto ): Promise<UploadResponse> {
    this.logger.info('here');
    this.logger.info(`data: ${typeof data.file}, length: ${data.file?.length}`);
    this.logger.info(`data: ${data.file}`);    
    await this.appService.uploadFile(data);
    return { message: 'File uploaded successfully' };
  }
}
