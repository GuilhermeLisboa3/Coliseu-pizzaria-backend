import { DeleteCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'

describe('DeleteCategoryController', () => {
  let sut: DeleteCategoryController

  beforeEach(() => {
    sut = new DeleteCategoryController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
