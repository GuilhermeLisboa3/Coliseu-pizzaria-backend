import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { LoadProductRepository, CheckProductByNameRepository, UpdateProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteFile, UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

type Setup = (
  productRepository: LoadProductRepository & CheckProductByNameRepository & UpdateProductRepository,
  categoryRepository: CheckCategoryByIdRepository,
  uuid: UUIDGenerator,
  fileStorage: DeleteFile & UploadFile
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
  let picture: string | undefined
  const key = uuid.generate()
  if (file) {
    if (product.picture) await fileStorage.delete({ fileName: product.picture })
    picture = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  }
  try {
    await productRepository.update({ name, categoryId, description, price, picture, id, available })
  } catch (error) {
    if (file) await fileStorage.delete({ fileName: `${key}.${file.mimeType.split('/')[1]}` })
  }
}
