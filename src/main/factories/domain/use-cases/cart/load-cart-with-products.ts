import { makeCartRepository } from '@/main/factories/infra/database/postgres/repositories'
import { LoadCartWithProducts } from '@/domain/use-cases/cart'

export const makeLoadCartWithProducts = (): LoadCartWithProducts =>
  makeCartRepository().loadWithProducts.bind(makeCartRepository())
