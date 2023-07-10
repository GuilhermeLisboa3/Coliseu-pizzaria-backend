import { DeleteCartItemController } from '@/application/controllers/cart-item'
import { Controller } from '@/application/controllers'
import { accountParams, productParams } from '@/tests/mocks'
import { FieldNotFoundError } from '@/domain/error'

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

  it('should return badRequest if deleteCartItem return FieldNotFoundError', async () => {
    deleteCartItem.mockRejectedValueOnce(new FieldNotFoundError('productId'))

    const { statusCode, data } = await sut.handle({ accountId, id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('productId'))
  })

  it('should return noContent on success', async () => {
    const { statusCode } = await sut.handle({ accountId, id })

    expect(statusCode).toBe(204)
  })
})
