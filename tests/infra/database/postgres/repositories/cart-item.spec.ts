import { CartItemRepository } from '@/infra/database/postgres/repositories'
import { accountParams, productParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('CartItemRepository', () => {
  let sut: CartItemRepository
  const { id, email, name, password } = accountParams
  const { available, description, picture, price } = productParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM users`
    await prisma.$queryRaw`DELETE FROM carts`
    await prisma.$queryRaw`DELETE FROM products`
    await prisma.$queryRaw`DELETE FROM categories`
    await prisma.user.create({ data: { id, name, password, email } })
    await prisma.cart.create({ data: { id, userId: id } })
    await prisma.category.create({ data: { id, name } })
    await prisma.product.create({ data: { id, available, description, name, picture, price, categoryId: id } })
    sut = new CartItemRepository()
  })

  describe('create()', () => {
    it('should create a cart item on success', async () => {
      const result = await sut.create({ cartId: id, productId: id })

      expect(result).toMatchObject({ cartId: id, productId: id, quantity: 1 })
    })
  })
})
