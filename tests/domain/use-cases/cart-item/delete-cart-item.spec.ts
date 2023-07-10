import { accountParams, productParams, categoryParams } from '@/tests/mocks'
import { DeleteCartItem, deleteCartItemUseCase } from '@/domain/use-cases/cart-item'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { FieldNotFoundError } from '@/domain/error'

import { mock } from 'jest-mock-extended'
import { LoadCartRepository } from '@/domain/contracts/database/repositories/cart'

describe('DeleteCartItem', () => {
  let sut: DeleteCartItem

  const productRepository = mock<LoadProductRepository>()
  const cartRepository = mock<LoadCartRepository>()

  const { id: accountId } = accountParams
  const { id: categoryId } = categoryParams
  const { id: productId, available, description, name, picture, price, error } = productParams

  beforeAll(() => {
    productRepository.load.mockResolvedValue({ id: productId, available, description, name, picture, price, categoryId })
  })

  beforeEach(() => {
    sut = deleteCartItemUseCase(productRepository, cartRepository)
  })

  it('should call LoadProductRepository with correct value', async () => {
    await sut({ accountId, productId })

    expect(productRepository.load).toHaveBeenCalledWith({ id: productId })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if LoadProductRepository return null', async () => {
    productRepository.load.mockResolvedValueOnce(null)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('productId'))
  })

  it('should rethrow if LoadProductRepository throws', async () => {
    productRepository.load.mockRejectedValueOnce(error)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call LoadCartRepository with correct value', async () => {
    await sut({ accountId, productId })

    expect(cartRepository.load).toHaveBeenCalledWith({ accountId })
    expect(cartRepository.load).toHaveBeenCalledTimes(1)
  })
})
