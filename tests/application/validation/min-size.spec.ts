import { MinSizeError } from '@/application/errors'
import { MinSizeValidation } from '@/application/validation'

describe('MinSizeValidation', () => {
  it('should return MinSizeError if length invalid', () => {
    const sut = new MinSizeValidation('any', 5)

    const error = sut.validate()

    expect(error).toEqual(new MinSizeError(5))
  })
})
