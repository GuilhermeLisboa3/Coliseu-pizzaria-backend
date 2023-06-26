import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { AddProductRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteFile, UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

type Setup = (
  productRepository: CheckProductByNameRepository & AddProductRepository,
  categoryRepository: CheckCategoryByIdRepository,
  uuid: UUIDGenerator,
  fileStorage: UploadFile & DeleteFile
) => AddProduct
type Input = { categoryId: string, name: string, description: string, price: number, file?: { buffer: Buffer, mimeType: string } }
type Output = void
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = (productRepository, categoryRepository, uuid, fileStorage) => async ({ name, categoryId, description, price, file }) => {
  const productExists = await productRepository.checkByName({ name })
  if (productExists) throw new FieldInUseError('name')
  const categoryExists = await categoryRepository.checkById({ id: categoryId })
  if (!categoryExists) throw new FieldNotFoundError('categoryId')
  const key = uuid.generate()
  let picture: string | undefined
  if (file) picture = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  try {
    await productRepository.create({ name, picture, categoryId, description, price })
  } catch (error) {
    if (file) await fileStorage.delete({ fileName: `${key}.${file.mimeType.split('/')[1]}` })
    throw error
  }
}
