# Noodl Runtime

## S3 File Storage

The runtime package provides a modern S3 client implementation for handling file uploads and deletions. The implementation uses AWS SDK v3 for improved security and performance.

### Configuration

The S3 client requires the following configuration in your cloud services metadata:

```javascript
{
  "s3Region": "us-east-1",        // AWS region for your S3 bucket
  "s3AccessKeyId": "YOUR_KEY",    // AWS access key ID
  "s3SecretAccessKey": "SECRET",  // AWS secret access key
  "s3Bucket": "your-bucket"       // S3 bucket name
}
```

### Usage

The S3 client is automatically used by the CloudStore for file operations. Example usage:

```javascript
// Upload a file
CloudStore.instance.uploadFile({
  file: myFile,
  onUploadProgress: (progress) => {
    console.log(`Upload progress: ${progress.loaded}/${progress.total}`);
  },
  success: (response) => {
    console.log('File uploaded:', response.url);
  },
  error: (err) => {
    console.error('Upload failed:', err);
  }
});

// Delete a file
CloudStore.instance.deleteFile({
  file: { name: 'filename.txt' },
  success: () => {
    console.log('File deleted');
  },
  error: (err) => {
    console.error('Delete failed:', err);
  }
});
```

### Security Best Practices

1. Always use environment variables or AWS credentials file for storing access keys
2. Configure appropriate bucket policies and CORS settings
3. Use pre-signed URLs for temporary file access
4. Regularly rotate access keys
5. Monitor S3 access logs for security events

### Implementation Details

The S3 client is implemented in TypeScript and provides:
- Progress tracking for uploads
- Error handling with detailed messages
- Support for various file types
- Automatic content type detection
- Singleton pattern for efficient resource usage

For more details, see the source code in `src/services/s3-client.ts`.
