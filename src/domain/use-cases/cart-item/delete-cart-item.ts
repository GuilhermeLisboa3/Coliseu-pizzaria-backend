import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'

type Setup = (productRepository: LoadProductRepository) => DeleteCartItem
type Input = { accountId: string, productId: string }
type Output = void
export type DeleteCartItem = (input: Input) => Promise<Output>

export const deleteCartItemUseCase: Setup = (productRepository) => async ({ accountId, productId }) => {
  await productRepository.load({ id: productId })
}
