import { JwtAdapter } from '@/infra/gateways'

import jwt from 'jsonwebtoken'
import faker from 'faker'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let secret: string
  let token: string
  const fakeJwt = jwt as jest.Mocked<typeof jwt>

  beforeAll(() => {
    secret = faker.datatype.uuid()
    token = faker.datatype.uuid()
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)
  })

  describe('generate()', () => {
    let key: string

    beforeAll(() => {
      secret = faker.datatype.uuid()
      fakeJwt.sign.mockImplementation(() => token)
    })

    beforeEach(() => {
      key = faker.random.word()
    })

    it('should call sign with correct values', async () => {
      await sut.generate({ key })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: '2d' })
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should return a accessToken on success', async () => {
      const accessToken = await sut.generate({ key })

      expect(accessToken).toBe(token)
    })
  })
})
