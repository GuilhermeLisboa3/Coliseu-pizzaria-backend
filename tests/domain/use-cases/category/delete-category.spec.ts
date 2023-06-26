import { categoryParams } from '@/tests/mocks'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { DeleteCategory, deleteCategoryUseCase } from '@/domain/use-cases/category'
import { FieldNotFoundError } from '@/domain/error'

import { mock } from 'jest-mock-extended'

describe('DeleteCategoryUseCase', () => {
  let sut: DeleteCategory

  const { id } = categoryParams

  const categoryRepository = mock<CheckCategoryByIdRepository>()

  beforeAll(() => {
    categoryRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = deleteCategoryUseCase(categoryRepository)
  })

  it('should call CheckCategoryByIdRepository with correct value', async () => {
    await sut({ id })

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if CheckCategoryByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('id'))
  })
})
