export const env = {
  port: process.env.PORT ?? 3333,
  secret: process.env.SECRET ?? 'aksdjfhiJABIKADJBI1898Y2134',
  aws: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
    bucket: process.env.AWS_BUCKET ?? ''
  }
}
