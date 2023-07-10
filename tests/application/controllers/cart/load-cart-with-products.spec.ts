import { LoadCartWithProductsController } from '@/application/controllers/cart'
import { accountParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'

describe('LoadCartWithProductsController', () => {
  let sut: LoadCartWithProductsController
  const loadCartWithProducts = jest.fn()
  const { id: accountId } = accountParams

  beforeEach(() => {
    sut = new LoadCartWithProductsController(loadCartWithProducts)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call loadCartWithProducts with correct values', async () => {
    await sut.handle({ accountId })

    expect(loadCartWithProducts).toHaveBeenCalledWith({ accountId })
    expect(loadCartWithProducts).toHaveBeenCalledTimes(1)
  })
})
