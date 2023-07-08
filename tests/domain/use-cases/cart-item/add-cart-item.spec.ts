import { accountParams, productParams, categoryParams } from '@/tests/mocks'
import { AddCartItem, addCartItemUseCase } from '@/domain/use-cases/cart-item'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { LoadCartRepository } from '@/domain/contracts/database/repositories/cart'
import { LoadCartItemRepository, AddCartItemRepository } from '@/domain/contracts/database/repositories/cart-item'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'
import faker from 'faker'

describe('AddCartItem', () => {
  let sut: AddCartItem

  const productRepository = mock<LoadProductRepository>()
  const cartRepository = mock<LoadCartRepository>()
  const cartItemRepository = mock<LoadCartItemRepository & AddCartItemRepository>()

  const id = faker.datatype.uuid()
  const { id: accountId } = accountParams
  const { id: categoryId } = categoryParams
  const { id: productId, available, description, name, picture, price, error } = productParams

  beforeAll(() => {
    cartRepository.load.mockResolvedValue({ accountId, id })
    productRepository.load.mockResolvedValue({ id: productId, available, description, name, picture, price, categoryId })
  })

  beforeEach(() => {
    sut = addCartItemUseCase(productRepository, cartRepository, cartItemRepository)
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

  it('should rethrow if LoadCartItemRepository throws', async () => {
    cartItemRepository.load.mockRejectedValueOnce(error)

    const promise = sut({ accountId, productId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call AddCartItemRepository if LoadCartItemRepository null', async () => {
    await sut({ accountId, productId })

    expect(cartItemRepository.create).toHaveBeenCalledWith({ cartId: id, productId })
    expect(cartItemRepository.create).toHaveBeenCalledTimes(1)
  })
})
