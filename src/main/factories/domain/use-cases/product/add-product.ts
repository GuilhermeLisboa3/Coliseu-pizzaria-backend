import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'
import { makeProductRepository, makeCategoryRepository } from '@/main/factories/infra/database/postgres/repositories'
import { makeAwsS3FileStorage, makeUUIDAdapter } from '@/main/factories/infra/gateways'
export const makeAddProduct = (): AddProduct => {
  return addProductUseCase(makeProductRepository(), makeCategoryRepository(), makeUUIDAdapter(), makeAwsS3FileStorage())
}
