import { DeleteCartItem, deleteCartItemUseCase } from '@/domain/use-cases/cart-item'
import { makeCartItemRepository, makeCartRepository, makeProductRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeDeleteCartItem = (): DeleteCartItem => {
  return deleteCartItemUseCase(makeProductRepository(), makeCartRepository(), makeCartItemRepository())
}
