import { AddCartRepository } from '@/domain/contracts/database/repositories/cart'
import { prisma } from '@/infra/database/postgres/helpers'

export class CartRepository implements AddCartRepository {
  async create ({ accountId }: AddCartRepository.Input): Promise<AddCartRepository.Output> {
    const { id, userId } = await prisma.cart.create({ data: { userId: accountId } })

    return { id, accountId: userId }
  }
}
