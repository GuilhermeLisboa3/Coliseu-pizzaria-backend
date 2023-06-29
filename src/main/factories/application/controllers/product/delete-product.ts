import { Controller } from '@/application/controllers'
import { DeleteProductController } from '@/application/controllers/product'
import { makeDeleteProduct } from '@/main/factories/domain/use-cases/product'

export const makeDeleteProductController = (): Controller => {
  return new DeleteProductController(makeDeleteProduct())
}
