import { AddCartItemRepository, LoadCartItemRepository, UpdateCartItemRepository } from '@/domain/contracts/database/repositories/cart-item'
import { prisma } from '@/infra/database/postgres/helpers'

export class CartItemRepository implements AddCartItemRepository, LoadCartItemRepository, UpdateCartItemRepository {
  async create ({ cartId, productId }: AddCartItemRepository.Input): Promise<AddCartItemRepository.Output> {
    return await prisma.cartItem.create({ data: { cartId, productId, quantity: 1 } })
  }

  async load ({ cartId, productId }: LoadCartItemRepository.Input): Promise<LoadCartItemRepository.Output> {
    return await prisma.cartItem.findFirst({ where: { cartId, productId } })
  }

  async update ({ id, quantity }: UpdateCartItemRepository.Input): Promise<UpdateCartItemRepository.Output> {
    return await prisma.cartItem.update({ where: { id }, data: { quantity } })
  }
}
