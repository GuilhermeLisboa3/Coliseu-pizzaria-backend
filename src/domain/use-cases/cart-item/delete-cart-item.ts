import { LoadCartRepository } from '@/domain/contracts/database/repositories/cart'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (productRepository: LoadProductRepository, cartRepository: LoadCartRepository) => DeleteCartItem
type Input = { accountId: string, productId: string }
type Output = void
export type DeleteCartItem = (input: Input) => Promise<Output>

export const deleteCartItemUseCase: Setup = (productRepository, cartRepository) => async ({ accountId, productId }) => {
  const product = await productRepository.load({ id: productId })
  if (!product) throw new FieldNotFoundError('productId')
  await cartRepository.load({ accountId })
}
