Noodl Runtime Documentation

# Noodl Runtime Documentation - v2.7.0

## Table of contents

### Classes

- [ModernS3Client](classes/ModernS3Client.md)

### Interfaces

- [S3Config](interfaces/S3Config.md)
- [UploadParams](interfaces/UploadParams.md)
- [DeleteParams](interfaces/DeleteParams.md)

### Functions

- [getS3Client](README.md#gets3client)

## Functions

### getS3Client

▸ **getS3Client**(`config?`): [`ModernS3Client`](classes/ModernS3Client.md)

Gets the singleton instance of ModernS3Client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`S3Config`](interfaces/S3Config.md) | S3 configuration object |

#### Returns

[`ModernS3Client`](classes/ModernS3Client.md)

ModernS3Client instance

#### Defined in

s3-client.ts:148
