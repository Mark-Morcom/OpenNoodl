import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { EventEmitter } from "events";

export interface UploadParams {
  Bucket: string;
  Key: string;
  Body: Buffer | Blob | ReadableStream;
  ContentType?: string;
}

export interface DownloadParams {
  Bucket: string;
  Key: string;
}

export class ModernS3Client {
  private client: S3Client;

  constructor(config: { region: string; credentials?: any }) {
    this.client = new S3Client({
      region: config.region,
      credentials: config.credentials || fromIni(),
    });
  }

  async uploadFile(params: UploadParams): Promise<EventEmitter> {
    const emitter = new EventEmitter();
    
    try {
      const upload = new Upload({
        client: this.client,
        params: {
          Bucket: params.Bucket,
          Key: params.Key,
          Body: params.Body,
          ContentType: params.ContentType || "application/octet-stream"
        }
      });

      upload.on("httpUploadProgress", (progress) => {
        emitter.emit("progress", {
          loaded: progress.loaded,
          total: progress.total
        });
      });

      await upload.done();
      emitter.emit("success");
    } catch (error) {
      emitter.emit("error", error);
    }

    return emitter;
  }

  async downloadFile(params: DownloadParams): Promise<EventEmitter> {
    const emitter = new EventEmitter();
    
    try {
      const response = await this.client.send({
        Bucket: params.Bucket,
        Key: params.Key
      });

      emitter.emit("success", response);
    } catch (error) {
      emitter.emit("error", error);
    }

    return emitter;
  }
}
