import { Controller } from '@/application/controllers'
import { AddProductController } from '@/application/controllers/product'
import { makeAddProduct } from '@/main/factories/domain/use-cases/product'

export const makeAddProductController = (): Controller => {
  return new AddProductController(makeAddProduct())
}
