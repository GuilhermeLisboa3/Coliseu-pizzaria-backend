import { Controller } from '@/application/controllers'
import { AddCartItemController } from '@/application/controllers/cart-item'
import { makeAddCartItem } from '@/main/factories/domain/use-cases/cart-item'

export const makeAddCartItemController = (): Controller => {
  return new AddCartItemController(makeAddCartItem())
}
