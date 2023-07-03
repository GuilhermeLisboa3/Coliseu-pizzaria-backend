import { LoadAddressByZipCodeController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'
import { addressParams } from '@/tests/mocks'
import { RequiredValidation } from '@/application/validation'
import { FieldNotFoundError } from '@/domain/error'

describe('LoadAddressByZipCodeController', () => {
  let sut: LoadAddressByZipCodeController
  const loadAddressByZipCode = jest.fn()
  const { zipCode } = addressParams

  beforeEach(() => {
    sut = new LoadAddressByZipCodeController(loadAddressByZipCode)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ zipCode })

    expect(validators).toEqual([
      new RequiredValidation(zipCode, 'zipCode')
    ])
  })

  it('should call loadAddressByZipCode with correct values', async () => {
    await sut.handle({ zipCode })

    expect(loadAddressByZipCode).toHaveBeenCalledWith({ zipCode })
    expect(loadAddressByZipCode).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if loadAddressByZipCode return FieldNotFoundError', async () => {
    loadAddressByZipCode.mockRejectedValueOnce(new FieldNotFoundError('zipCode'))
    const { statusCode, data } = await sut.handle({ zipCode })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('zipCode'))
  })
})
