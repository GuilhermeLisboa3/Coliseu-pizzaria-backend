import { ProductRepository } from '@/infra/database/postgres/repositories'
export const makeProductRepository = (): ProductRepository => {
  return new ProductRepository()
}
