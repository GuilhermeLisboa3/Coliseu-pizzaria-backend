import { categoryParams } from '@/tests/mocks'
import { AddCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'
import { RequiredValidation } from '@/application/validation'

describe('AddCategoryController', () => {
  const { name } = categoryParams
  const addAccount = jest.fn()
  let sut: AddCategoryController

  beforeEach(() => {
    sut = new AddCategoryController(addAccount)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ name })

    expect(validators).toEqual([
      new RequiredValidation(name, 'name')
    ])
  })

  it('should call addAccount with correct values', async () => {
    await sut.handle({ name })

    expect(addAccount).toHaveBeenCalledWith({ name })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })
})
