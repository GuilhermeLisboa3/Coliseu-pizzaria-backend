import { productParams } from '@/tests/mocks'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteProduct, deleteProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'

describe('deleteProductUseCase', () => {
  const { id, name, description, price, available, picture } = productParams
  const makeParams = { id }

  const productRepository = mock<LoadProductRepository>()

  let sut: DeleteProduct

  beforeAll(() => {
    productRepository.load.mockResolvedValue({ id, name, description, price, categoryId: id, available, picture })
  })

  beforeEach(() => {
    sut = deleteProductUseCase(productRepository)
  })

  it('should call CheckProductByIdRepository with correct value', async () => {
    await sut(makeParams)

    expect(productRepository.load).toHaveBeenCalledWith({ id })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if LoadProductRepository return null', async () => {
    productRepository.load.mockResolvedValueOnce(null)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new FieldNotFoundError('id'))
  })
})
