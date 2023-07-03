import { LoadAddressByZipCodeController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'
import { addressParams } from '@/tests/mocks'
import { RequiredValidation } from '@/application/validation'

describe('LoadAddressByZipCodeController', () => {
  let sut: LoadAddressByZipCodeController
  const { zipCode } = addressParams

  beforeEach(() => {
    sut = new LoadAddressByZipCodeController()
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
})
