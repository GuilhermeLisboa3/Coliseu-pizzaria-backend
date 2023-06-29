import { productParams } from '@/tests/mocks'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteProduct, deleteProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'

describe('deleteProductUseCase', () => {
  const { id } = productParams
  const makeParams = { id }

  const productRepository = mock<LoadProductRepository>()

  let sut: DeleteProduct

  beforeEach(() => {
    sut = deleteProductUseCase(productRepository)
  })

  it('should call CheckProductByIdRepository with correct value', async () => {
    await sut(makeParams)

    expect(productRepository.load).toHaveBeenCalledWith({ id })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })
})
