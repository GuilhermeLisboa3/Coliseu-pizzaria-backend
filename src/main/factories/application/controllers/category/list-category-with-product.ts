import { Controller } from '@/application/controllers'
import { ListCategoryWithProductController } from '@/application/controllers/category'
import { makeListCategoryWithProduct } from '@/main/factories/domain/use-cases/category'

export const makeListCategoryWithProductController = (): Controller => {
  return new ListCategoryWithProductController(makeListCategoryWithProduct())
}
