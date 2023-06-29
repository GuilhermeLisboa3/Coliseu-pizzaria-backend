import { DeleteProductController } from '@/application/controllers/product'
import { Controller } from '@/application/controllers'

describe('DeleteProductController', () => {
  let sut: DeleteProductController

  beforeEach(() => {
    sut = new DeleteProductController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
