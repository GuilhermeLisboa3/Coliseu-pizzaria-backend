import { categoryParams } from '@/tests/mocks'
import { DeleteCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'

describe('DeleteCategoryController', () => {
  const { id } = categoryParams
  const deleteCategory = jest.fn()

  let sut: DeleteCategoryController

  beforeEach(() => {
    sut = new DeleteCategoryController(deleteCategory)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call deleteCategory with correct value', async () => {
    await sut.handle({ id })

    expect(deleteCategory).toHaveBeenCalledWith({ id })
    expect(deleteCategory).toHaveBeenCalledTimes(1)
  })
})
