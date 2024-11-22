[Noodl Runtime Documentation - v2.7.0](../README.md) / ModernS3Client

# Class: ModernS3Client

Modern S3 client implementation using AWS SDK v3
Provides file upload and deletion capabilities with progress tracking

## Table of contents

### Constructors

- [constructor](ModernS3Client.md#constructor)

### Properties

- [client](ModernS3Client.md#client)

### Methods

- [uploadFile](ModernS3Client.md#uploadfile)
- [deleteFile](ModernS3Client.md#deletefile)

## Constructors

### constructor

• **new ModernS3Client**(`config`): [`ModernS3Client`](ModernS3Client.md)

Creates a new instance of ModernS3Client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`S3Config`](../interfaces/S3Config.md) | S3 configuration object |

#### Returns

[`ModernS3Client`](ModernS3Client.md)

#### Defined in

s3-client.ts:74

## Properties

### client

• `Private` **client**: `S3Client`

#### Defined in

s3-client.ts:68

## Methods

### uploadFile

▸ **uploadFile**(`params`): `Promise`\<`EventEmitter`\<`DefaultEventMap`\>\>

Uploads a file to S3 with progress tracking

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`UploadParams`](../interfaces/UploadParams.md) | Upload parameters |

#### Returns

`Promise`\<`EventEmitter`\<`DefaultEventMap`\>\>

EventEmitter with upload progress and result

#### Defined in

s3-client.ts:86

___

### deleteFile

▸ **deleteFile**(`params`): `Promise`\<`EventEmitter`\<`DefaultEventMap`\>\>

Deletes a file from S3

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`DeleteParams`](../interfaces/DeleteParams.md) | Delete parameters |

#### Returns

`Promise`\<`EventEmitter`\<`DefaultEventMap`\>\>

EventEmitter with deletion result

#### Defined in

s3-client.ts:124
