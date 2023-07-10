import { DeleteCartItemController } from '@/application/controllers/cart-item'
import { Controller } from '@/application/controllers'
import { accountParams, productParams } from '@/tests/mocks'

describe('DeleteCartItemController', () => {
  let sut: DeleteCartItemController
  const deleteCartItem = jest.fn()
  const { id } = productParams
  const { id: accountId } = accountParams

  beforeEach(() => {
    sut = new DeleteCartItemController(deleteCartItem)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call deleteCartItem with correct values', async () => {
    await sut.handle({ accountId, id })

    expect(deleteCartItem).toHaveBeenCalledWith({ accountId, productId: id })
    expect(deleteCartItem).toHaveBeenCalledTimes(1)
  })
})
