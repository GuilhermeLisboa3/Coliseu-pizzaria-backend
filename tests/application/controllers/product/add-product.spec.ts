import { AddProductController } from '@/application/controllers/product'
import { Controller } from '@/application/controllers'

describe('AddProductController', () => {
  let sut: AddProductController

  beforeEach(() => {
    sut = new AddProductController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
