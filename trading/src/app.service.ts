import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { Model } from 'mongoose';
// import { File, FileDocument } from './schemas/file.schema';
// import { UploadRequest } from './file/file.pb';

@Injectable()
export class AppService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>, @InjectPinoLogger(AppService.name) private readonly logger: PinoLogger) {}
  
  public async uploadFile(request : UploadRequest): Promise<void> {    
    this.logger.info(`data: ${typeof request.file}, length: ${request.file?.length}`);
    this.logger.info(`data: ${request.filename}`);
    const newFile = new this.fileModel({
      filename: request.filename,
      file: Buffer.from(request.file, 'base64'),
    });
    await newFile.save();
  }
}
