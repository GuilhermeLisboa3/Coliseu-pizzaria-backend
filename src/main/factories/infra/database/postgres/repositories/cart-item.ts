import { CartItemRepository } from '@/infra/database/postgres/repositories'
export const makeCartItemRepository = (): CartItemRepository => {
  return new CartItemRepository()
}
