import { LoadCartRepository } from '@/domain/contracts/database/repositories/cart'
import { LoadCartItemRepository } from '@/domain/contracts/database/repositories/cart-item'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (
  productRepository: LoadProductRepository,
  cartRepository: LoadCartRepository,
  cartItemRepository: LoadCartItemRepository
) => DeleteCartItem
type Input = { accountId: string, productId: string }
type Output = void
export type DeleteCartItem = (input: Input) => Promise<Output>

export const deleteCartItemUseCase: Setup = (productRepository, cartRepository, cartItemRepository) => async ({ accountId, productId }) => {
  const product = await productRepository.load({ id: productId })
  if (!product) throw new FieldNotFoundError('productId')
  const cart = await cartRepository.load({ accountId })
  if (!cart) throw new FieldNotFoundError('cart')
  const cartItem = await cartItemRepository.load({ cartId: cart.id, productId })
  if (!cartItem) throw new FieldNotFoundError('cartItem')
}
