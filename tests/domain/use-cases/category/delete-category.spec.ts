import { categoryParams } from '@/tests/mocks'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { DeleteCategory, deleteCategoryUseCase } from '@/domain/use-cases/category'

import { mock } from 'jest-mock-extended'

describe('DeleteCategoryUseCase', () => {
  let sut: DeleteCategory

  const { id } = categoryParams

  const categoryRepository = mock<CheckCategoryByIdRepository>()

  beforeEach(() => {
    sut = deleteCategoryUseCase(categoryRepository)
  })

  it('should call CheckCategoryByIdRepository with correct value', async () => {
    await sut({ id })

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
