import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'
import { makeProductRepository, makeCategoryRepository } from '@/main/factories/infra/database/postgres/repositories'
import { makeAwsS3FileStorage, makeUUIDAdapter } from '@/main/factories/infra/gateways'
export const makeUpdateProduct = (): UpdateProduct => {
  return updateProductUseCase(makeProductRepository(), makeCategoryRepository(), makeUUIDAdapter(), makeAwsS3FileStorage())
}
