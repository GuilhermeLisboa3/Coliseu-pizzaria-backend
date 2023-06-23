import { app, env } from '@/main/config'
import { authAdmin } from '@/main/middlewares'
import { accountParams } from '@/tests/mocks'
import { UnauthorizedError } from '@/application/errors'
import { prisma } from '@/infra/database/postgres/helpers'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('Auth Admin Middleware', () => {
  const { id, name, email, password } = accountParams
  it('should return 401 if authorization header was not provided', async () => {
    app.get('/fake_route', authAdmin)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(401)
    expect(body.error).toBe(new UnauthorizedError().message)
  })

  it('should return 200 if authorization header is valid', async () => {
    const account = await prisma.user.create({ data: { id, name, email, password, role: 'admin' } })
    const token = sign({ key: account.id }, env.secret)
    app.get('/fake_route', authAdmin, (req, res) => { res.json(req.locals) })

    const { status, body } = await request(app)
      .get('/fake_route')
      .set({ authorization: `Bearer: ${token}` })

    expect(status).toBe(200)
    expect(body).toEqual({ accountId: id })
  })
})
