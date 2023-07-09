import { AddCartRepository, LoadCartRepository } from '@/domain/contracts/database/repositories/cart'
import { prisma } from '@/infra/database/postgres/helpers'

export class CartRepository implements AddCartRepository, LoadCartRepository {
  async create ({ accountId }: AddCartRepository.Input): Promise<AddCartRepository.Output> {
    const { id, userId } = await prisma.cart.create({ data: { userId: accountId } })

    return { id, accountId: userId }
  }

  async load ({ accountId }: LoadCartRepository.Input): Promise<LoadCartRepository.Output> {
    const cart = await prisma.cart.findFirst({ where: { userId: accountId } })
    if (!cart) return null
    return { id: cart.id, accountId: cart.userId }
  }
}
