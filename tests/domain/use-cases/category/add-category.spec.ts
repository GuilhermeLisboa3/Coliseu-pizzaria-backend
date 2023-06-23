import { categoryParams } from '@/tests/mocks'
import { CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { AddCategory, addCategoryUseCase } from '@/domain/use-cases/category'

import { mock } from 'jest-mock-extended'

describe('addCategoryUseCase', () => {
  let sut: AddCategory

  const { name } = categoryParams

  const categoryRepository = mock<CheckCategoryByNameRepository>()

  beforeEach(() => {
    sut = addCategoryUseCase(categoryRepository)
  })

  it('should call CheckCategoryByNameRepository with correct value', async () => {
    await sut({ name })

    expect(categoryRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(categoryRepository.checkByName).toHaveBeenCalledTimes(1)
  })
})
