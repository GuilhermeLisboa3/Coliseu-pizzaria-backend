import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { FieldInUseError } from '@/domain/error'

type Setup = (productRepository: CheckProductByNameRepository) => AddProduct
type Input = { name: string }
type Output = void
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = (productRepository) => async ({ name }) => {
  const productExists = await productRepository.checkByName({ name })
  if (productExists) throw new FieldInUseError('name')
}
