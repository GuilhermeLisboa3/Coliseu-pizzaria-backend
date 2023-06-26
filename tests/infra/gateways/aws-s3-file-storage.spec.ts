import { AwsS3FileStorage } from '@/infra/gateways'

import { config, S3 } from 'aws-sdk'
import faker from 'faker'

jest.mock('aws-sdk')

describe('AwsS3FileStorage', () => {
  let sut: AwsS3FileStorage

  let secretAccessKey: string
  let accessKeyId: string
  let bucket: string
  let fileName: string
  let error: Error

  beforeAll(() => {
    accessKeyId = faker.datatype.uuid()
    secretAccessKey = faker.datatype.uuid()
    bucket = faker.database.column()
    fileName = faker.datatype.uuid()
    error = new Error(faker.random.words(5))
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKeyId, secretAccessKey, bucket)
  })

  it('should config aws credentials on creation', () => {
    expect(sut)
    expect(config.update).toHaveBeenCalledWith({ credentials: { accessKeyId, secretAccessKey } })
    expect(config.update).toHaveBeenCalledTimes(1)
  })

  describe('upload()', () => {
    let file: Buffer

    const putObjectPromiseSpy: jest.Mock = jest.fn()
    const putObjectSpy: jest.Mock = jest.fn()

    beforeAll(() => {
      file = Buffer.from(faker.random.word())

      putObjectSpy.mockImplementation(() => ({ promise: putObjectPromiseSpy }))
      jest.mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ putObject: putObjectSpy })))
    })

    it('should call putObject with correct values', async () => {
      await sut.upload({ fileName, file })

      expect(putObjectSpy).toHaveBeenCalledWith({ Bucket: bucket, Key: fileName, Body: file, ACL: 'public-read' })
      expect(putObjectSpy).toHaveBeenCalledTimes(1)
      expect(putObjectPromiseSpy).toHaveBeenCalledTimes(1)
    })

    it('should rethrow if putObject throw', async () => {
      putObjectPromiseSpy.mockRejectedValueOnce(error)

      const promise = sut.upload({ fileName, file })

      await expect(promise).rejects.toThrow(error)
    })

    it('should return url on success', async () => {
      const imageUrl = await sut.upload({ fileName, file })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/${fileName}`)
    })
  })
})
