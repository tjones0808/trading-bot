/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "app";

/** The request message containing the file's byte data. */
export interface UploadRequest {
  file: string;
  filename: string;
}

/** The response message containing the upload status. */
export interface UploadResponse {
  message: string;
}

export const APP_PACKAGE_NAME = "app";

/** The File service definition. */

export interface FileServiceClient {
  /** Uploads a file */

  uploadFile(request: UploadRequest): Observable<UploadResponse>;
}

/** The File service definition. */

export interface FileServiceController {
  /** Uploads a file */

  uploadFile(request: UploadRequest): Promise<UploadResponse> | Observable<UploadResponse> | UploadResponse;
}

export function FileServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["uploadFile"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FileService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FileService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FILE_SERVICE_NAME = "FileService";
