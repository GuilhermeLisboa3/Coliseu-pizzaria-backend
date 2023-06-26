import { productParams } from '@/tests/mocks'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'
import { FieldInUseError } from '@/domain/error'

describe('AddProductUseCase', () => {
  const { name, error } = productParams
  const productRepository = mock<CheckProductByNameRepository>()

  let sut: AddProduct

  beforeEach(() => {
    sut = addProductUseCase(productRepository)
  })

  it('should call CheckProductByNameRepository with correct value', async () => {
    await sut({ name })

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckProductByNameRepository return true', async () => {
    productRepository.checkByName.mockResolvedValueOnce(true)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(new FieldInUseError('name'))
  })

  it('should rethrow if CheckProductByNameRepository throws', async () => {
    productRepository.checkByName.mockRejectedValueOnce(error)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(error)
  })
})
