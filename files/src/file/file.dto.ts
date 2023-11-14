import { IsNumber, IsString } from 'class-validator';
import { UploadRequest } from './file.pb';

export class UploadFileDto implements UploadRequest {
  
  // check is the file is a buffer  
  @IsString()
  public readonly file: string;
  
  @IsString()
  public readonly filename: string;
}
