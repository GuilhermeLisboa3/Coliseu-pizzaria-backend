import { MaxFileSizeError } from '@/application/errors'
import { MaxFileSizeValidation } from '@/application/validation'

describe('MaxFileSizeValidation', () => {
  it('should return MaxFileSizeError if value is invalid', () => {
    const invalidBuffer = Buffer.from(new ArrayBuffer(6 * 1024 * 1024))
    const sut = new MaxFileSizeValidation(5, invalidBuffer)

    const error = sut.validate()

    expect(error).toEqual(new MaxFileSizeError(5))
  })
})
