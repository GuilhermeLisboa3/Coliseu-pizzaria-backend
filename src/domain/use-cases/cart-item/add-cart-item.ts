import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (productRepository: LoadProductRepository) => AddCartItem
type Input = { accountId: string, productId: string }
type Output = void
export type AddCartItem = (input: Input) => Promise<Output>

export const addCartItemUseCase: Setup = (productRepository) => async ({ accountId, productId }) => {
  const product = await productRepository.load({ id: productId })
  if (!product) throw new FieldNotFoundError('productId')
}
