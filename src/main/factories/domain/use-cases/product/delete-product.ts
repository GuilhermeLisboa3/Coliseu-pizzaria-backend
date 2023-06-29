import { deleteProductUseCase, DeleteProduct } from '@/domain/use-cases/product'
import { makeProductRepository } from '@/main/factories/infra/database/postgres/repositories'
import { makeAwsS3FileStorage } from '@/main/factories/infra/gateways'
export const makeDeleteProduct = (): DeleteProduct => {
  return deleteProductUseCase(makeProductRepository(), makeAwsS3FileStorage())
}
