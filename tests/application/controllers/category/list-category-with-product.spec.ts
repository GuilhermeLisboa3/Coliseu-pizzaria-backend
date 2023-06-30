import { ListCategoryWithProductController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'

describe('ListCategoryWithProductController', () => {
  let sut: ListCategoryWithProductController

  beforeEach(() => {
    sut = new ListCategoryWithProductController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
