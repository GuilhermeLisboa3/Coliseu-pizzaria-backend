import { AddCartRepository, LoadCartRepository, LoadCartWithProductsRepository } from '@/domain/contracts/database/repositories/cart'
import { prisma, PrismaHelper } from '@/infra/database/postgres/helpers'

export class CartRepository implements AddCartRepository, LoadCartRepository, LoadCartWithProductsRepository {
  async create ({ accountId }: AddCartRepository.Input): Promise<AddCartRepository.Output> {
    const { id, userId } = await prisma.cart.create({ data: { userId: accountId } })

    return { id, accountId: userId }
  }

  async load ({ accountId }: LoadCartRepository.Input): Promise<LoadCartRepository.Output> {
    const cart = await prisma.cart.findFirst({ where: { userId: accountId } })
    if (!cart) return null
    return { id: cart.id, accountId: cart.userId }
  }

  async loadWithProducts ({ accountId }: LoadCartWithProductsRepository.Input): Promise<LoadCartWithProductsRepository.Output> {
    const cart = await prisma.cart.findFirst({
      where: { userId: accountId },
      select: {
        id: true,
        userId: true,
        cartItem: {
          select: {
            quantity: true,
            product: {
              select: { id: true, available: true, description: true, price: true, name: true, picture: true, categoryId: true, category: { select: { name: true } } }
            }
          }
        }
      }
    })
    if (!cart) return null
    return {
      id: cart.id,
      accountId: cart.userId,
      products: cart.cartItem.map(cartItem => {
        return { ...PrismaHelper.productMap(cartItem.product), quantity: cartItem.quantity, categoryName: cartItem.product.category.name }
      })
    }
  }
}
