import { productParams } from '@/tests/mocks'
import { AddProductController } from '@/application/controllers/product'
import { Controller } from '@/application/controllers'
import { AllowedMimeTypesValidation, MaxFileSizeValidation, RequiredValidation } from '@/application/validation'

describe('AddProductController', () => {
  const { name, description, price, file, id } = productParams
  const makeParams = { categoryId: id, name, description, price, file }
  let sut: AddProductController

  beforeEach(() => {
    sut = new AddProductController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeParams)

    expect(validators).toEqual([
      new RequiredValidation(name, 'name'),
      new RequiredValidation(id, 'categoryId'),
      new RequiredValidation(description, 'description'),
      new RequiredValidation(price, 'price'),
      new AllowedMimeTypesValidation(['png', 'jpg'], file.mimeType),
      new MaxFileSizeValidation(10, file.buffer)
    ])
  })
})
