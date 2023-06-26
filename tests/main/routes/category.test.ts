import { env } from '@/main/config'
import { categoryParams, accountParams } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'
import { FieldInUseError } from '@/domain/error'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('Category routes', () => {
  let token: string
  const { name } = categoryParams
  const { email, password, id } = accountParams

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
})
