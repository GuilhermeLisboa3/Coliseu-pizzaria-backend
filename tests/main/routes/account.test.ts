import { accountParams } from '@/tests/mocks'
import { app } from '@/main/config/app'

import request from 'supertest'

describe('Account routes', () => {
  const { name, email, password } = accountParams

  describe('POST /signup', () => {
    it('should return 201 on success', async () => {
      const { status } = await request(app)
        .post('/signup')
        .send({ name, email, password })

      expect(status).toBe(201)
    })
  })
})
