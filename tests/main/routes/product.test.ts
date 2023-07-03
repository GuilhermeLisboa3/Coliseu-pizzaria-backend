import { env } from '@/main/config'
import { categoryParams, accountParams, productParams } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('Product routes', () => {
  let token: string
  const { name } = categoryParams
  const { email, password, id } = accountParams
  const { description, picture, price, available } = productParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM addresses`
    await prisma.$queryRaw`DELETE FROM users`
    await prisma.$queryRaw`DELETE FROM products`
    await prisma.$queryRaw`DELETE FROM categories`
  })

  beforeAll(async () => {
    token = sign({ key: id }, env.secret)
  })

  beforeEach(async () => {
    await prisma.user.create({ data: { id, name, email, password, role: 'admin' } })
    await prisma.category.create({ data: { id, name } })
  })

  describe('POST /product', () => {
    it('should return 400 if name already exists', async () => {
      await prisma.product.create({ data: { name, description, picture, price, available, category_id: id } })
      const { status, body: { error } } = await request(app)
        .post('/product')
        .set({ authorization: `Bearer: ${token}` })
        .send({ categoryId: id, name, description, price })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldInUseError('name').message)
    })

    it('should return 400 if categoryId not exist', async () => {
      const { status, body: { error } } = await request(app)
        .post('/product')
        .set({ authorization: `Bearer: ${token}` })
        .send({ categoryId: '2', name, description, price })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldNotFoundError('categoryId').message)
    })

    it('should return 204 on success', async () => {
      const { status } = await request(app)
        .post('/product')
        .set({ authorization: `Bearer: ${token}` })
        .send({ categoryId: id, name, description, price })

      expect(status).toBe(204)
    })
  })

  describe('PUT /product/:id', () => {
    it('should return 400 if name already exists', async () => {
      await prisma.product.create({ data: { id, name, description, picture, price, available, category_id: id } })
      const { status, body: { error } } = await request(app)
        .put(`/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })
        .send({ categoryId: id, name, description, price })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldInUseError('name').message)
    })

    it('should return 400 if product not exists', async () => {
      const { status, body: { error } } = await request(app)
        .put(`/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })
        .send({ categoryId: id, name, description, price })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldNotFoundError('id').message)
    })

    it('should return 204 on success', async () => {
      await prisma.product.create({ data: { id, name, description, picture, price, available, category_id: id } })
      const { status } = await request(app)
        .put(`/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })
        .send({ name: 'any_name' })

      expect(status).toBe(204)
    })
  })

  describe('DELETE /product/:id', () => {
    it('should return 400 if product not exists', async () => {
      const { status, body: { error } } = await request(app)
        .delete(`/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldNotFoundError('id').message)
    })

    it('should return 204 on success', async () => {
      await prisma.product.create({ data: { id, name, description, picture, price, available, category_id: id } })
      const { status } = await request(app)
        .delete(`/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
    })
  })
})
