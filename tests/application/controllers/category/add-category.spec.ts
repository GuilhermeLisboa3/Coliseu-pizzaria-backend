import { categoryParams } from '@/tests/mocks'
import { AddCategoryController } from '@/application/controllers/category'
import { Controller } from '@/application/controllers'
import { RequiredValidation } from '@/application/validation'
import { FieldInUseError } from '@/domain/error'

describe('AddCategoryController', () => {
  const { name } = categoryParams
  const addCategory = jest.fn()
  let sut: AddCategoryController

  beforeEach(() => {
    sut = new AddCategoryController(addCategory)
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

  it('should call addCategory with correct values', async () => {
    await sut.handle({ name })

    expect(addCategory).toHaveBeenCalledWith({ name })
    expect(addCategory).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if addCategory return FieldInUseError', async () => {
    addCategory.mockRejectedValueOnce(new FieldInUseError('name'))
    const { statusCode, data } = await sut.handle({ name })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldInUseError('name'))
  })
})
