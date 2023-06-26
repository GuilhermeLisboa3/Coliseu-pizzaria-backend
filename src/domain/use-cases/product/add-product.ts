import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { FieldInUseError } from '@/domain/error'

type Setup = (
  productRepository: CheckProductByNameRepository,
  categoryRepository: CheckCategoryByIdRepository
) => AddProduct
type Input = { name: string, categoryId: string }
type Output = void
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = (productRepository, categoryRepository) => async ({ name, categoryId }) => {
  const productExists = await productRepository.checkByName({ name })
  if (productExists) throw new FieldInUseError('name')
  await categoryRepository.checkById({ id: categoryId })
}
