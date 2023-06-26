import { DeleteCategory, deleteCategoryUseCase } from '@/domain/use-cases/category'
import { makeCategoryRepository } from '@/main/factories/infra/database/postgres/repositories'
export const makeDeleteCategory = (): DeleteCategory => {
  return deleteCategoryUseCase(makeCategoryRepository())
}
