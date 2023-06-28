import { productParams, categoryParams } from '@/tests/mocks'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'

describe('updateProductUseCase', () => {
  const { name, file, description, price, available, picture, error } = productParams
  const { id } = categoryParams
  const makeParams = { id, name, categoryId: id, description, price, file }

  const productRepository = mock<LoadProductRepository>()

  let sut: UpdateProduct

  beforeAll(() => {
    productRepository.load.mockResolvedValue({ id, name, description, price, categoryId: id, available, picture })
  })

  beforeEach(() => {
    sut = updateProductUseCase(productRepository)
  })

  it('should call LoadProductRepository with correct id', async () => {
    await sut(makeParams)

    expect(productRepository.load).toHaveBeenCalledWith({ id })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if LoadProductRepository return null', async () => {
    productRepository.load.mockResolvedValueOnce(null)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new FieldNotFoundError('id'))
  })

  it('should rethrow if LoadProductRepository throws', async () => {
    productRepository.load.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(error)
  })
})
