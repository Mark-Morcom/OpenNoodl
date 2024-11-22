/**
 * @module Services
 */

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { EventEmitter } from "events";

/**
 * Configuration interface for the S3 client
 * @interface
 */
export interface S3Config {
  /** AWS region for the S3 bucket */
  region: string;
  /** AWS access key ID */
  accessKeyId?: string;
  /** AWS secret access key */
  secretAccessKey?: string;
  /** AWS credentials object */
  credentials?: any;
}

/**
 * Upload parameters interface
 * @interface
 */
export interface UploadParams {
  /** S3 bucket name */
  Bucket: string;
  /** S3 object key */
  Key: string;
  /** File to upload */
  Body: Buffer | Blob | ReadableStream;
  /** Optional content type */
  ContentType?: string;
}

/**
 * Delete parameters interface
 * @interface
 */
export interface DeleteParams {
  /** S3 bucket name */
  Bucket: string;
  /** S3 object key to delete */
  Key: string;
}

/**
 * Progress event interface for file uploads
 * @interface
 */
interface ProgressEvent {
  /** Number of bytes loaded */
  loaded: number;
  /** Total number of bytes */
  total: number;
}

/**
 * Modern S3 client implementation using AWS SDK v3
 * Provides file upload and deletion capabilities with progress tracking
 * @class
 */
export class ModernS3Client {
  private client: S3Client;

  /**
   * Creates a new instance of ModernS3Client
   * @param config - S3 configuration object
   */
  constructor(config: S3Config) {
    this.client = new S3Client({
      region: config.region,
      credentials: config.credentials || fromIni(),
    });
  }

  /**
   * Uploads a file to S3 with progress tracking
   * @param params - Upload parameters
   * @returns EventEmitter with upload progress and result
   */
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

      const result = await upload.done();
      emitter.emit("success", {
        name: params.Key,
        url: `https://${params.Bucket}.s3.${this.client.config.region}.amazonaws.com/${params.Key}`
      });
    } catch (error) {
      emitter.emit("error", error);
    }

    return emitter;
  }

  /**
   * Deletes a file from S3
   * @param params - Delete parameters
   * @returns EventEmitter with deletion result
   */
  async deleteFile(params: DeleteParams): Promise<EventEmitter> {
    const emitter = new EventEmitter();
    
    try {
      const command = new DeleteObjectCommand({
        Bucket: params.Bucket,
        Key: params.Key
      });

      await this.client.send(command);
      emitter.emit("success");
    } catch (error) {
      emitter.emit("error", error);
    }

    return emitter;
  }
}

/**
 * Gets the singleton instance of ModernS3Client
 * @param config - S3 configuration object
 * @returns ModernS3Client instance
 */
export function getS3Client(config?: S3Config): ModernS3Client {
  let instance: ModernS3Client | null = null;

  if (!instance && config) {
    instance = new ModernS3Client(config);
  }
  if (!instance) {
    throw new Error("S3Client not initialized. Please provide config first time.");
  }
  return instance;
}
