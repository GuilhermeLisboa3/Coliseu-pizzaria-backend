import { MinSizeError } from '@/application/errors'
import { MinSizeValidation } from '@/application/validation'

describe('MinSizeValidation', () => {
  it('should return MinSizeError if length invalid', () => {
    const sut = new MinSizeValidation('any', 5)

    const error = sut.validate()

    expect(error).toEqual(new MinSizeError(5))
  })

  it('should return undefined if length valid', () => {
    const sut = new MinSizeValidation('any_v', 5)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if length valid', () => {
    const sut = new MinSizeValidation('any_value', 5)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
