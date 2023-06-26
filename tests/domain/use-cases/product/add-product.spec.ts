import { productParams, categoryParams } from '@/tests/mocks'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

describe('AddProductUseCase', () => {
  const { name, error } = productParams
  const { id } = categoryParams
  const makeParams = { name, categoryId: id }

  const productRepository = mock<CheckProductByNameRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()

  let sut: AddProduct

  beforeAll(() => {
    categoryRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = addProductUseCase(productRepository, categoryRepository)
  })

  it('should call CheckProductByNameRepository with correct value', async () => {
    await sut(makeParams)

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckProductByNameRepository return true', async () => {
    productRepository.checkByName.mockResolvedValueOnce(true)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new FieldInUseError('name'))
  })

  it('should rethrow if CheckProductByNameRepository throws', async () => {
    productRepository.checkByName.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CheckCategoryByIdRepository with correct value', async () => {
    await sut(makeParams)

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if CheckCategoryByIdRepository return true', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new FieldNotFoundError('categoryId'))
  })
})
