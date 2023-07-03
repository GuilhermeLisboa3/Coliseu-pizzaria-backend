import { accountParams } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'

import request from 'supertest'
import { FieldInUseError } from '@/domain/error'
import { RequiredFieldError, UnauthorizedError } from '@/application/errors'

describe('Account routes', () => {
  const { name, email, password } = accountParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM addresses`
    await prisma.$queryRaw`DELETE FROM users`
  })

  describe('POST /signup', () => {
    it('should return 201 on success', async () => {
      const { status } = await request(app)
        .post('/signup')
        .send({ name, email, password })

      expect(status).toBe(201)
    })

    it('should return 400 if email already exists', async () => {
      await prisma.user.create({ data: { name, email, password } })
      const { status, body: { error } } = await request(app)
        .post('/signup')
        .send({ name, email, password })

      expect(status).toBe(400)
      expect(error).toEqual(new FieldInUseError('email').message)
    })

    it('should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .post('/signup')
        .send({ email, password })

      expect(status).toBe(400)
      expect(error).toEqual(new RequiredFieldError('name').message)
    })
  })

  describe('POST /login', () => {
    it('should return 200 on success', async () => {
      await request(app).post('/signup').send({ name, email, password })
      const { status } = await request(app)
        .post('/login')
        .send({ email, password })

      expect(status).toBe(200)
    })

    it('should return 401 if account does not exists', async () => {
      const { status, body: { error } } = await request(app)
        .post('/login')
        .send({ email, password })

      expect(status).toBe(401)
      expect(error).toEqual(new UnauthorizedError().message)
    })
  })
})
