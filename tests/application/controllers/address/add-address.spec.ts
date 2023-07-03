import { AddAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'
import { addressParams } from '@/tests/mocks'
import { RequiredValidation } from '@/application/validation'

describe('AddAddressController', () => {
  let sut: AddAddressController
  const { neighborhood, complement, number, street, surname, zipCode, id } = addressParams

  beforeEach(() => {
    sut = new AddAddressController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ neighborhood, complement, number, street, surname, zipCode, accountId: id })

    expect(validators).toEqual([
      new RequiredValidation(zipCode, 'zipCode'),
      new RequiredValidation(neighborhood, 'neighborhood'),
      new RequiredValidation(number, 'number'),
      new RequiredValidation(street, 'street'),
      new RequiredValidation(surname, 'surname')
    ])
  })
})
