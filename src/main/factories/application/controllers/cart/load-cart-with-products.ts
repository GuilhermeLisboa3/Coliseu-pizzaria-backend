import { Controller } from '@/application/controllers'
import { LoadCartWithProductsController } from '@/application/controllers/cart'
import { makeLoadCartWithProducts } from '@/main/factories/domain/use-cases/cart'

export const makeLoadCartWithProductsController = (): Controller => {
  return new LoadCartWithProductsController(makeLoadCartWithProducts())
}
