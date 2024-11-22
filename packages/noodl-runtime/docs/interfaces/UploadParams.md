[Noodl Runtime Documentation - v2.7.0](../README.md) / UploadParams

# Interface: UploadParams

Upload parameters interface

## Table of contents

### Properties

- [Bucket](UploadParams.md#bucket)
- [Key](UploadParams.md#key)
- [Body](UploadParams.md#body)
- [ContentType](UploadParams.md#contenttype)

## Properties

### Bucket

• **Bucket**: `string`

S3 bucket name

#### Defined in

s3-client.ts:31

___

### Key

• **Key**: `string`

S3 object key

#### Defined in

s3-client.ts:33

___

### Body

• **Body**: `Blob` \| `ReadableStream`\<`any`\> \| `Buffer`

File to upload

#### Defined in

s3-client.ts:35

___

### ContentType

• `Optional` **ContentType**: `string`

Optional content type

#### Defined in

s3-client.ts:37
