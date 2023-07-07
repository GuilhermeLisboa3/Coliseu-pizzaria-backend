import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'

type Setup = (productRepository: LoadProductRepository) => AddCartItem
type Input = { accountId: string, productId: string }
type Output = void
export type AddCartItem = (input: Input) => Promise<Output>

export const addCartItemUseCase: Setup = (productRepository) => async ({ accountId, productId }) => {
  await productRepository.load({ id: productId })
}
