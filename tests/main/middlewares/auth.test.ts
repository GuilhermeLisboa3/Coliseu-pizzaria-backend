import { app, env } from '@/main/config'
import { auth } from '@/main/middlewares'
import { accountParams } from '@/tests/mocks'
import { ForbiddenError, UnauthorizedError } from '@/application/errors'
import { prisma } from '@/infra/database/postgres/helpers'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('Auth Middleware', () => {
  const { id, name, email, password } = accountParams
  it('should return 401 if authorization header was not provided', async () => {
    app.get('/fake_route', auth)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(401)
    expect(body.error).toBe(new UnauthorizedError().message)
  })

  it('should return 200 if authorization header is valid', async () => {
    const account = await prisma.user.create({ data: { id, name, email, password } })
    const token = sign({ key: account.id }, env.secret)
    app.get('/fake_route', auth, (req, res) => { res.json(req.locals) })

    const { status, body } = await request(app)
      .get('/fake_route')
      .set({ authorization: `Bearer: ${token}` })

    expect(status).toBe(200)
    expect(body).toEqual({ accountId: id })
  })

  it('should return 403 if token is invalid', async () => {
    const token = sign({ key: 'any_value' }, env.secret)
    app.get('/fake_route', auth, (req, res) => { res.json(req.locals) })

    const { status, body } = await request(app)
      .get('/fake_route')
      .set({ authorization: `Bearer: ${token}` })

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })
})
