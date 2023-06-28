import { productParams } from '@/tests/mocks'
import { UpdateProductController } from '@/application/controllers/product'
import { Controller } from '@/application/controllers'
import { AllowedMimeTypesValidation, MaxFileSizeValidation, RequiredValidation } from '@/application/validation'

describe('UpdateProductController', () => {
  const { id, name, file } = productParams
  let sut: UpdateProductController

  beforeEach(() => {
    sut = new UpdateProductController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ id, name, file })

    expect(validators).toEqual([
      new RequiredValidation(id, 'id'),
      new AllowedMimeTypesValidation(['png', 'jpg'], file.mimeType),
      new MaxFileSizeValidation(10, file.buffer)
    ])
  })
})
