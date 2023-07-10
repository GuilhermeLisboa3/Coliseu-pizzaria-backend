import { Controller } from '@/application/controllers'
import { DeleteCartItemController } from '@/application/controllers/cart-item'
import { makeDeleteCartItem } from '@/main/factories/domain/use-cases/cart-item'

export const makeDeleteCartItemController = (): Controller => {
  return new DeleteCartItemController(makeDeleteCartItem())
}
