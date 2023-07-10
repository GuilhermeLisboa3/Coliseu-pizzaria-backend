import { accountParams, productParams, categoryParams } from '@/tests/mocks'
import { DeleteCartItem, deleteCartItemUseCase } from '@/domain/use-cases/cart-item'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { LoadCartRepository } from '@/domain/contracts/database/repositories/cart'
import { LoadCartItemRepository, UpdateCartItemRepository, DeleteCartItemRepository } from '@/domain/contracts/database/repositories/cart-item'
import { FieldNotFoundError } from '@/domain/error'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('DeleteCartItem', () => {
  let sut: DeleteCartItem

  const id = faker.datatype.uuid()
  const productRepository = mock<LoadProductRepository>()
  const cartRepository = mock<LoadCartRepository>()
  const cartItemRepository = mock<LoadCartItemRepository & UpdateCartItemRepository & DeleteCartItemRepository>()

  const { id: accountId } = accountParams
  const { id: categoryId } = categoryParams
  const { id: productId, available, description, name, picture, price, error } = productParams

  beforeAll(() => {
    cartRepository.load.mockResolvedValue({ id, accountId })
    cartItemRepository.load.mockResolvedValue({ id, cartId: id, productId, quantity: 2 })
    productRepository.load.mockResolvedValue({ id: productId, available, description, name, picture, price, categoryId })
  })

  beforeEach(() => {
    sut = deleteCartItemUseCase(productRepository, cartRepository, cartItemRepository)
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

  it('should throw FieldNotFoundError if LoadCartRepository return null', async () => {
    cartRepository.load.mockResolvedValueOnce(null)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('cart'))
  })

  it('should rethrow if LoadCartRepository throws', async () => {
    cartRepository.load.mockRejectedValueOnce(error)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call LoadCartItemRepository with correct value', async () => {
    await sut({ accountId, productId })

    expect(cartItemRepository.load).toHaveBeenCalledWith({ cartId: id, productId })
    expect(cartItemRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if LoadCartItemRepository return null', async () => {
    cartItemRepository.load.mockResolvedValueOnce(null)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('cartItem'))
  })

  it('should rethrow if LoadCartItemRepository throws', async () => {
    cartItemRepository.load.mockRejectedValueOnce(error)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call UpdateCartItemRepository if LoadCartItemRepository return quantity langer one', async () => {
    await sut({ accountId, productId })

    expect(cartItemRepository.update).toHaveBeenCalledWith({ id: id, quantity: 1 })
    expect(cartItemRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UpdateCartItemRepository throws', async () => {
    cartItemRepository.update.mockRejectedValueOnce(error)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call DeleteCartItemRepository if LoadCartItemRepository return quantity one', async () => {
    await sut({ accountId, productId })

    expect(cartItemRepository.delete).toHaveBeenCalledWith({ id })
    expect(cartItemRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if DeleteCartItemRepository throws', async () => {
    cartItemRepository.delete.mockRejectedValueOnce(error)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should return undefined on success', async () => {
    const result = await sut({ accountId, productId })

    expect(result).toBeUndefined()
  })
})
