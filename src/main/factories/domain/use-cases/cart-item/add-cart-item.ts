import { AddCartItem, addCartItemUseCase } from '@/domain/use-cases/cart-item'
import { makeCartItemRepository, makeCartRepository, makeProductRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeAddCartItem = (): AddCartItem => {
  return addCartItemUseCase(makeProductRepository(), makeCartRepository(), makeCartItemRepository())
}
