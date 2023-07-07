import { accountParams, productParams } from '@/tests/mocks'
import { AddCartItem, addCartItemUseCase } from '@/domain/use-cases/cart-item'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'

import { mock } from 'jest-mock-extended'

describe('AddCartItem', () => {
  let sut: AddCartItem

  const productRepository = mock<LoadProductRepository>()

  const { id: accountId } = accountParams
  const { id: productId } = productParams

  beforeEach(() => {
    sut = addCartItemUseCase(productRepository)
  })

  it('should call LoadProductRepository with correct value', async () => {
    await sut({ accountId, productId })

    expect(productRepository.load).toHaveBeenCalledWith({ id: productId })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })
})
