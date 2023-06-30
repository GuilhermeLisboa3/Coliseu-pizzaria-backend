import { ListCategoryWithProductController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'

describe('ListCategoryWithProductController', () => {
  let sut: ListCategoryWithProductController
  const listCategoryWithProduct = jest.fn()

  beforeEach(() => {
    sut = new ListCategoryWithProductController(listCategoryWithProduct)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call listCategoryWithProduct', async () => {
    await sut.handle()

    expect(listCategoryWithProduct).toHaveBeenCalled()
    expect(listCategoryWithProduct).toHaveBeenCalledTimes(1)
  })

  it('should return ok on success', async () => {
    const { statusCode } = await sut.handle()

    expect(statusCode).toBe(200)
  })
})
