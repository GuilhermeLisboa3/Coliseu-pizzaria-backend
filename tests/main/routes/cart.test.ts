import { env } from '@/main/config'
import { categoryParams, accountParams, productParams } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('Cart routes', () => {
  let token: string
  const { name } = categoryParams
  const { email, password, id } = accountParams
  const { description, picture, price, available } = productParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM "cartItems"`
    await prisma.$queryRaw`DELETE FROM carts`
    await prisma.$queryRaw`DELETE FROM users`
    await prisma.$queryRaw`DELETE FROM products`
    await prisma.$queryRaw`DELETE FROM categories`
    await prisma.user.create({ data: { id, name, email, password, role: 'admin' } })
    await prisma.cart.create({ data: { id, userId: id } })
    await prisma.category.create({ data: { id, name } })
    await prisma.product.create({ data: { id, name, description, picture, price, available, categoryId: id } })
    await prisma.cartItem.create({ data: { id, cartId: id, productId: id, quantity: 2 } })
  })

  beforeAll(async () => {
    token = sign({ key: id }, env.secret)
  })

  describe('GET /cart', () => {
    it('should return 200 on success', async () => {
      const { status } = await request(app)
        .get('/cart')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
    })
  })
})
