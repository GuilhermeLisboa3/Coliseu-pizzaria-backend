import { productParams } from '@/tests/mocks'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'

describe('AddProductUseCase', () => {
  const { name } = productParams
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
})
