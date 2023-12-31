import { productParams } from '@/tests/mocks'
import { UpdateProductController } from '@/application/controllers/product'
import { Controller } from '@/application/controllers'
import { AllowedMimeTypesValidation, MaxFileSizeValidation, RequiredValidation } from '@/application/validation'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

describe('UpdateProductController', () => {
  const { id, name, file } = productParams
  const updateProduct = jest.fn()
  let sut: UpdateProductController

  beforeEach(() => {
    sut = new UpdateProductController(updateProduct)
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

  it('should call updateProduct with correct values', async () => {
    await sut.handle({ id, name, file })

    expect(updateProduct).toHaveBeenCalledWith({ id, name, file })
    expect(updateProduct).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if updateProduct return FieldInUseError', async () => {
    updateProduct.mockRejectedValueOnce(new FieldInUseError('name'))
    const { statusCode, data } = await sut.handle({ id, name, file })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldInUseError('name'))
  })

  it('should return badRequest if updateProduct return FieldNotFoundError', async () => {
    updateProduct.mockRejectedValueOnce(new FieldNotFoundError('categoryId'))
    const { statusCode, data } = await sut.handle({ id, name, file })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('categoryId'))
  })

  it('should return noContent on success', async () => {
    const { statusCode } = await sut.handle({ id, name, file })

    expect(statusCode).toBe(204)
  })
})
