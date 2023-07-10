import { LoadCartWithProductsController } from '@/application/controllers/cart'
import { Controller } from '@/application/controllers'

describe('LoadCartWithProductsController', () => {
  let sut: LoadCartWithProductsController

  beforeEach(() => {
    sut = new LoadCartWithProductsController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
