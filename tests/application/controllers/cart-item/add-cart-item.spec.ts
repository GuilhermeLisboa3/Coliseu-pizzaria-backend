import { accountParams, productParams } from '@/tests/mocks'
import { AddCartItemController } from '@/application/controllers/cart-item'
import { Controller } from '@/application/controllers'
import { FieldNotFoundError } from '@/domain/error'

describe('AddCartItemController', () => {
  let sut: AddCartItemController
  const addCartItem = jest.fn()
  const { id: accountId } = accountParams
  const { id: productId } = productParams

  beforeEach(() => {
    sut = new AddCartItemController(addCartItem)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call addCartItem with correct values', async () => {
    await sut.handle({ accountId, productId })

    expect(addCartItem).toHaveBeenCalledWith({ accountId, productId })
    expect(addCartItem).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if addCartItem return FieldNotFoundError', async () => {
    addCartItem.mockRejectedValueOnce(new FieldNotFoundError('productId'))
    const { statusCode, data } = await sut.handle({ accountId, productId })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('productId'))
  })
})
