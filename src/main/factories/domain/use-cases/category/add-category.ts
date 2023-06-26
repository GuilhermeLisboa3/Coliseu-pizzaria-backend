import { AddCategory, addCategoryUseCase } from '@/domain/use-cases/category'
import { makeCategoryRepository } from '@/main/factories/infra/database/postgres/repositories'
export const makeAddCategory = (): AddCategory => {
  return addCategoryUseCase(makeCategoryRepository())
}
