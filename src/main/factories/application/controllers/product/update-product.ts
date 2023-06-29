import { Controller } from '@/application/controllers'
import { UpdateProductController } from '@/application/controllers/product'
import { makeUpdateProduct } from '@/main/factories/domain/use-cases/product'

export const makeUpdateProductController = (): Controller => {
  return new UpdateProductController(makeUpdateProduct())
}
