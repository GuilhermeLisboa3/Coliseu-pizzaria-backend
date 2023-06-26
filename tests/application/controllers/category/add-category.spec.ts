import { categoryParams } from '@/tests/mocks'
import { AddCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'
import { RequiredValidation } from '@/application/validation'

describe('AddCategoryController', () => {
  let sut: AddCategoryController
  const { name } = categoryParams

  beforeEach(() => {
    sut = new AddCategoryController()
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
})
