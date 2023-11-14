import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards, OnModuleInit, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { Express } from 'express';
import { Multer } from 'multer';
import { UploadResponse, UploadRequest, FILE_SERVICE_NAME, FileServiceClient } from './file.pb';

@Controller('file')
export class FileController implements OnModuleInit {
  constructor(@InjectPinoLogger(FileController.name) private readonly logger: PinoLogger) {}
  private svc: FileServiceClient;

  @Inject(FILE_SERVICE_NAME) private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<FileServiceClient>(FILE_SERVICE_NAME);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  private async uploadFile(@UploadedFile() file: Express.Multer.File) : Promise<Observable<UploadResponse>> {       

    const body: UploadRequest = {                  
      file: file.buffer.toString('base64'),
      filename: file.originalname
    };

    this.logger.info(`data: ${typeof body.file}, length: ${body.file?.length}`);

    return this.svc.uploadFile(body);
  }
}