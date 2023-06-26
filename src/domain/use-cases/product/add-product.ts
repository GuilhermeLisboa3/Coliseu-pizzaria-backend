import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

type Setup = (
  productRepository: CheckProductByNameRepository,
  categoryRepository: CheckCategoryByIdRepository,
  uuid: UUIDGenerator
) => AddProduct
type Input = { name: string, categoryId: string }
type Output = void
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = (productRepository, categoryRepository, uuid) => async ({ name, categoryId }) => {
  const productExists = await productRepository.checkByName({ name })
  if (productExists) throw new FieldInUseError('name')
  const categoryExists = await categoryRepository.checkById({ id: categoryId })
  if (!categoryExists) throw new FieldNotFoundError('categoryId')
  uuid.generate()
}
