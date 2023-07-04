import { UpdateAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'
import { addressParams } from '@/tests/mocks'
import { RequiredValidation } from '@/application/validation'

describe('UpdateAddressController', () => {
  let sut: UpdateAddressController
  const { id, complement } = addressParams

  beforeEach(() => {
    sut = new UpdateAddressController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ id, complement, accountId: id })

    expect(validators).toEqual([
      new RequiredValidation(id, 'id')
    ])
  })
})
