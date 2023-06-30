import { makeCategoryRepository } from '@/main/factories/infra/database/postgres/repositories'
import { ListCategoryWithProduct } from '@/domain/use-cases/category'

export const makeListCategoryWithProduct = (): ListCategoryWithProduct =>
  makeCategoryRepository().list.bind(makeCategoryRepository())
