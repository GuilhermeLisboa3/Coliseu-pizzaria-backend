import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { LoadCartRepository } from '@/domain/contracts/database/repositories/cart'
import { LoadCartItemRepository, AddCartItemRepository } from '@/domain/contracts/database/repositories/cart-item'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (productRepository: LoadProductRepository, cartRepository: LoadCartRepository, cartItemRepository: LoadCartItemRepository & AddCartItemRepository) => AddCartItem
type Input = { accountId: string, productId: string }
type Output = void
export type AddCartItem = (input: Input) => Promise<Output>

export const addCartItemUseCase: Setup = (productRepository, cartRepository, cartItemRepository) => async ({ accountId, productId }) => {
  const product = await productRepository.load({ id: productId })
  if (!product) throw new FieldNotFoundError('productId')
  const cart = await cartRepository.load({ accountId })
  if (!cart) throw new FieldNotFoundError('cart')
  const cartItem = await cartItemRepository.load({ cartId: cart.id, productId })
  if (!cartItem) {
    await cartItemRepository.create({ cartId: cart.id, productId })
  }
}
