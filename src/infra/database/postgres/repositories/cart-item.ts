import { AddCartItemRepository, LoadCartItemRepository } from '@/domain/contracts/database/repositories/cart-item'
import { prisma } from '@/infra/database/postgres/helpers'

export class CartItemRepository implements AddCartItemRepository, LoadCartItemRepository {
  async create ({ cartId, productId }: AddCartItemRepository.Input): Promise<AddCartItemRepository.Output> {
    return await prisma.cartItem.create({ data: { cartId, productId, quantity: 1 } })
  }

  async load ({ cartId, productId }: LoadCartItemRepository.Input): Promise<LoadCartItemRepository.Output> {
    return await prisma.cartItem.findFirst({ where: { cartId, productId } })
  }
}
