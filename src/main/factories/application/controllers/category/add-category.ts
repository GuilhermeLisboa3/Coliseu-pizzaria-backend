import { Controller } from '@/application/controllers'
import { AddCategoryController } from '@/application/controllers/category'
import { makeAddCategory } from '@/main/factories/domain/use-cases/category'

export const makeAddCategoryController = (): Controller => {
  return new AddCategoryController(makeAddCategory())
}
