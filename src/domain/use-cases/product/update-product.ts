import { LoadProductRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

type Setup = (
  productRepository: LoadProductRepository & CheckProductByNameRepository
) => UpdateProduct
type Input = { id: string, categoryId?: string, name?: string, description?: string, price?: number, file?: { buffer: Buffer, mimeType: string }, available?: boolean }
type Output = void
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = (productRepository) => async ({ name, categoryId, description, price, file, id, available }) => {
  const product = await productRepository.load({ id })
  if (!product) throw new FieldNotFoundError('id')
  if (name) {
    const nameExists = await productRepository.checkByName({ name })
    if (nameExists) throw new FieldInUseError('name')
  }
}
