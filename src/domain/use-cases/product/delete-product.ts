import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (productRepository: LoadProductRepository) => DeleteProduct
type Input = { id: string }
type Output = void
export type DeleteProduct = (input: Input) => Promise<Output>

export const deleteProductUseCase: Setup = (productRepository) => async ({ id }) => {
  const product = await productRepository.load({ id })
  if (!product) throw new FieldNotFoundError('id')
}
