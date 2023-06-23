import { categoryParams } from '@/tests/mocks'
import { CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { AddCategory, addCategoryUseCase } from '@/domain/use-cases/category'

import { mock } from 'jest-mock-extended'
import { FieldInUseError } from '@/domain/error'

describe('addCategoryUseCase', () => {
  let sut: AddCategory

  const { name, error } = categoryParams

  const categoryRepository = mock<CheckCategoryByNameRepository>()

  beforeAll(() => {
    categoryRepository.checkByName.mockResolvedValue(false)
  })

  beforeEach(() => {
    sut = addCategoryUseCase(categoryRepository)
  })

  it('should call CheckCategoryByNameRepository with correct value', async () => {
    await sut({ name })

    expect(categoryRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(categoryRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckCategoryByNameRepository return true', async () => {
    categoryRepository.checkByName.mockResolvedValueOnce(true)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(new FieldInUseError('name'))
  })

  it('should rethrow if CheckAccountByEmailRepository throws', async () => {
    categoryRepository.checkByName.mockRejectedValueOnce(error)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(error)
  })
})
