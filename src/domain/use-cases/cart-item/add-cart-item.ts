import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { LoadCartRepository } from '@/domain/contracts/database/repositories/cart'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (productRepository: LoadProductRepository, cartRepository: LoadCartRepository) => AddCartItem
type Input = { accountId: string, productId: string }
type Output = void
export type AddCartItem = (input: Input) => Promise<Output>

export const addCartItemUseCase: Setup = (productRepository, cartRepository) => async ({ accountId, productId }) => {
  const product = await productRepository.load({ id: productId })
  if (!product) throw new FieldNotFoundError('productId')
  await cartRepository.load({ accountId })
}
