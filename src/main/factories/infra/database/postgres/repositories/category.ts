import { CategoryRepository } from '@/infra/database/postgres/repositories'
export const makeCategoryRepository = (): CategoryRepository => {
  return new CategoryRepository()
}
