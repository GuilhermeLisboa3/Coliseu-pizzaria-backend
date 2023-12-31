import { env } from '@/main/config'
import { categoryParams, accountParams, productParams, resetDataBase } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'
import { FieldNotFoundError } from '@/domain/error'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('Cart Item routes', () => {
  let token: string
  const { name } = categoryParams
  const { email, password, id } = accountParams
  const { description, picture, price, available } = productParams

  beforeEach(async () => {
    await resetDataBase()
    await prisma.user.create({ data: { id, name, email, password, role: 'admin' } })
    await prisma.cart.create({ data: { id, userId: id } })
    await prisma.category.create({ data: { id, name } })
    await prisma.product.create({ data: { id, name, description, picture, price, available, categoryId: id } })
  })

  beforeAll(async () => {
    token = sign({ key: id }, env.secret)
  })

  describe('POST /cart-item/:id', () => {
    it('should return 400 if product not exists', async () => {
      const { status, body: { error } } = await request(app)
        .post(`/cart-item/${2}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldNotFoundError('productId').message)
    })

    it('should return 200 on success', async () => {
      const { status } = await request(app)
        .post(`/cart-item/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
    })
  })

  describe('DELETE /cart-item/:id', () => {
    it('should return 400 if product not exists', async () => {
      const { status, body: { error } } = await request(app)
        .delete(`/cart-item/${2}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldNotFoundError('productId').message)
    })

    it('should return 204 on success', async () => {
      await prisma.cartItem.create({ data: { cartId: id, productId: id, quantity: 2 } })
      const { status } = await request(app)
        .delete(`/cart-item/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
    })
  })
})
