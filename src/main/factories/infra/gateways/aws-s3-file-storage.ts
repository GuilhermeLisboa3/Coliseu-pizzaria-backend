import { env } from '@/main/config'
import { DeleteFile, UploadFile } from '@/domain/contracts/gateways'
import { AwsS3FileStorage } from '@/infra/gateways'

export const makeAwsS3FileStorage = (): DeleteFile & UploadFile =>
  new AwsS3FileStorage(env.aws.accessKeyId, env.aws.secretAccessKey, env.aws.bucket)
