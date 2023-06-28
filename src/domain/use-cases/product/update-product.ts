import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { LoadProductRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

type Setup = (
  productRepository: LoadProductRepository & CheckProductByNameRepository,
  categoryRepository: CheckCategoryByIdRepository,
  uuid: UUIDGenerator,
  fileStorage: DeleteFile
) => UpdateProduct
type Input = { id: string, categoryId?: string, name?: string, description?: string, price?: number, file?: { buffer: Buffer, mimeType: string }, available?: boolean }
type Output = void
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = (productRepository, categoryRepository, uuid, fileStorage) => async ({ name, categoryId, description, price, file, id, available }) => {
  const product = await productRepository.load({ id })
  if (!product) throw new FieldNotFoundError('id')
  if (name) {
    const nameExists = await productRepository.checkByName({ name })
    if (nameExists) throw new FieldInUseError('name')
  }
  if (categoryId) {
    const category = await categoryRepository.checkById({ id: categoryId })
    if (!category) throw new FieldNotFoundError('categoryId')
  }
  uuid.generate()
  if (file) {
    if (product.picture) await fileStorage.delete({ fileName: product.picture })
  }
}
