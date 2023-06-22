import { accountParams } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'

import request from 'supertest'
import { FieldInUseError } from '@/domain/error'

describe('Account routes', () => {
  const { name, email, password } = accountParams

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
  })
})
