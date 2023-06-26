import { categoryParams } from '@/tests/mocks'
import { DeleteCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'
import { FieldNotFoundError } from '@/domain/error'

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

  it('should return badRequest if deleteCategory return FieldNotFoundError', async () => {
    deleteCategory.mockRejectedValueOnce(new FieldNotFoundError('id'))
    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('id'))
  })
})
