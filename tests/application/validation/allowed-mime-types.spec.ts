import { InvalidMimeTypeError } from '@/application/errors'
import { AllowedMimeTypesValidation } from '@/application/validation'

describe('AllowedMimeTypesValidation', () => {
  it('should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypesValidation(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })
})
