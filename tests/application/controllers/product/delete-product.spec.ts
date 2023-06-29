import { productParams } from '@/tests/mocks'
import { DeleteProductController } from '@/application/controllers/product'
import { Controller } from '@/application/controllers'

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
})
