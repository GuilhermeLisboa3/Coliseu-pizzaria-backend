import { UpdateProductController } from '@/application/controllers/product'
import { Controller } from '@/application/controllers'

describe('UpdateProductController', () => {
  let sut: UpdateProductController

  beforeEach(() => {
    sut = new UpdateProductController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
