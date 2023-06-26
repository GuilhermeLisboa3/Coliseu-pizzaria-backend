import { UploadFile } from '@/domain/contracts/gateways'
import { S3, config } from 'aws-sdk'

export class AwsS3FileStorage {
  constructor (accessKeyId: string, secretAccessKey: string, private readonly bucket: string) {
    config.update({ credentials: { accessKeyId, secretAccessKey } })
  }

  async upload ({ fileName, file }: UploadFile.Input): Promise<UploadFile.Output> {
    await new S3().putObject({ Bucket: this.bucket, Key: fileName, Body: file, ACL: 'public-read' }).promise()

    return `https://${this.bucket}.s3.amazonaws.com/${encodeURIComponent(fileName)}`
  }
}
