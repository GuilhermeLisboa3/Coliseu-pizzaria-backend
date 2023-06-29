import { productParams } from '@/tests/mocks'
import { DeleteProductController } from '@/application/controllers/product'
import { Controller } from '@/application/controllers'
import { FieldNotFoundError } from '@/domain/error'

describe('DeleteProductController', () => {
  const { id } = productParams
  const deleteProduct = jest.fn()
  let sut: DeleteProductController

  beforeEach(() => {
    sut = new DeleteProductController(deleteProduct)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call deleteProduct with correct values', async () => {
    await sut.handle({ id })

    expect(deleteProduct).toHaveBeenCalledWith({ id })
    expect(deleteProduct).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if updateProduct return FieldNotFoundError', async () => {
    deleteProduct.mockRejectedValueOnce(new FieldNotFoundError('id'))
    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('id'))
  })
})
