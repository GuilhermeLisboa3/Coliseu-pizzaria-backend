import { env } from '@/main/config'
import { categoryParams, accountParams, productParams } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('Category routes', () => {
  let token: string
  const { name } = categoryParams
  const { email, password, id } = accountParams
  const { description, available, picture, price } = productParams

  beforeAll(async () => {
    token = sign({ key: id }, env.secret)
  })

  beforeEach(async () => {
    await prisma.user.create({ data: { id, name, email, password, role: 'admin' } })
  })

  describe('POST /category', () => {
    it('should return 400 if name already exists', async () => {
      await prisma.category.create({ data: { name } })
      const { status, body: { error } } = await request(app)
        .post('/category')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldInUseError('name').message)
    })

    it('should return 204 on success', async () => {
      const { status } = await request(app)
        .post('/category')
        .set({ authorization: `Bearer: ${token}` })
        .send({ name })

      expect(status).toBe(204)
    })
  })

  describe('DELETE /category/:id', () => {
    it('should return 400 if id not exist', async () => {
      const { status, body: { error } } = await request(app)
        .delete(`/category/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldNotFoundError('id').message)
    })

    it('should return 204 on success', async () => {
      await prisma.category.create({ data: { id, name } })
      const { status } = await request(app)
        .delete(`/category/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
    })
  })

  describe('GET /categories', () => {
    it('should return 200 on success', async () => {
      await prisma.category.create({ data: { id, name } })
      await prisma.product.create({ data: { id, name, description, available, picture, price, category_id: id } })
      const { status, body } = await request(app)
        .get('/categories')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toEqual([{
        id,
        name,
        products: [{ id, name, description, available, picture, price, categoryId: id }]
      }])
    })
  })
})
