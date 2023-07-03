import { env } from '@/main/config'
import { accountParams, addressParams } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'
import { ZipCodeApi } from '@/infra/gateways'

import request from 'supertest'
import { sign } from 'jsonwebtoken'

jest.mock('@/infra/gateways/zipcode-api')

describe('Address routes', () => {
  let token: string
  const { email, password, id, name } = accountParams
  const { zipCode, neighborhood, street } = addressParams

  const searchSpy: jest.Mock = jest.fn()

  jest.mocked(ZipCodeApi).mockImplementation(jest.fn().mockImplementation(() => ({ search: searchSpy })))

  beforeAll(async () => {
    token = sign({ key: id }, env.secret)
  })

  beforeEach(async () => {
    await prisma.user.create({ data: { id, name, email, password, role: 'admin' } })
  })

  describe('GET /address', () => {
    it('should return 200 on success', async () => {
      searchSpy.mockReturnValueOnce({ neighborhood, street })
      const { status, body } = await request(app)
        .get('/address')
        .set({ authorization: `Bearer: ${token}` })
        .send({ zipCode })

      expect(status).toBe(200)
      expect(body).toEqual({ neighborhood, street })
    })
  })
})
