import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'

type Setup = (
  productRepository: LoadProductRepository
) => UpdateProduct
type Input = { id: string, categoryId?: string, name?: string, description?: string, price?: number, file?: { buffer: Buffer, mimeType: string }, available?: boolean }
type Output = void
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = (productRepository) => async ({ name, categoryId, description, price, file, id, available }) => {
  await productRepository.load({ id })
}
