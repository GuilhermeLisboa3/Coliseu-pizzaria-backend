import { CartRepository } from '@/infra/database/postgres/repositories'
export const makeCartRepository = (): CartRepository => {
  return new CartRepository()
}
