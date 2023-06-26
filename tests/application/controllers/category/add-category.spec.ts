import { AddCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'

describe('AddCategoryController', () => {
  let sut: AddCategoryController

  beforeEach(() => {
    sut = new AddCategoryController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
