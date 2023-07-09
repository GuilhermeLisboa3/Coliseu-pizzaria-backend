import { AddCartItemController } from '@/application/controllers/cart-item'
import { Controller } from '@/application/controllers'

describe('AddCartItemController', () => {
  let sut: AddCartItemController

  beforeEach(() => {
    sut = new AddCartItemController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
