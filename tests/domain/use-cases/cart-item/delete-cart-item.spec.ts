import { accountParams, productParams } from '@/tests/mocks'
import { DeleteCartItem, deleteCartItemUseCase } from '@/domain/use-cases/cart-item'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'

import { mock } from 'jest-mock-extended'

describe('DeleteCartItem', () => {
  let sut: DeleteCartItem

  const productRepository = mock<LoadProductRepository>()

  const { id: accountId } = accountParams
  const { id: productId } = productParams

  beforeEach(() => {
    sut = deleteCartItemUseCase(productRepository)
  })

  it('should call LoadProductRepository with correct value', async () => {
    await sut({ accountId, productId })

    expect(productRepository.load).toHaveBeenCalledWith({ id: productId })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })
})
