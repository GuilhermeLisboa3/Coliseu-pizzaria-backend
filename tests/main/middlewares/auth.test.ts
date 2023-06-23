import { app } from '@/main/config'
import { auth } from '@/main/middlewares'
import { UnauthorizedError } from '@/application/errors'

import request from 'supertest'

describe('Auth Middleware', () => {
  it('should return 401 if authorization header was not provided', async () => {
    app.get('/fake_route', auth)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(401)
    expect(body.error).toBe(new UnauthorizedError().message)
  })
})
