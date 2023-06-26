import { Controller } from '@/application/controllers'
import { DeleteCategoryController } from '@/application/controllers/category'
import { makeDeleteCategory } from '@/main/factories/domain/use-cases/category'

export const makeDeleteCategoryControllerr = (): Controller => {
  return new DeleteCategoryController(makeDeleteCategory())
}
