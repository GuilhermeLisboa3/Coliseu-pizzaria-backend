import { DeleteCartItemController } from '@/application/controllers/cart-item'
import { Controller } from '@/application/controllers'

describe('DeleteCartItemController', () => {
  let sut: DeleteCartItemController

  beforeEach(() => {
    sut = new DeleteCartItemController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
