import { AddCartItemRepository } from '@/domain/contracts/database/repositories/cart-item'
import { prisma } from '@/infra/database/postgres/helpers'

export class CartItemRepository implements AddCartItemRepository {
  async create ({ cartId, productId }: AddCartItemRepository.Input): Promise<AddCartItemRepository.Output> {
    return await prisma.cartItem.create({ data: { cartId, productId, quantity: 1 } })
  }
}
