import { JwtAdapter } from '@/infra/gateways'

import jwt from 'jsonwebtoken'
import faker from 'faker'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let secret: string
  const fakeJwt = jwt as jest.Mocked<typeof jwt>

  beforeAll(() => {
    secret = faker.datatype.uuid()
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)
  })

  describe('generate()', () => {
    let key: string

    beforeAll(() => {
      secret = faker.datatype.uuid()
    })

    beforeEach(() => {
      key = faker.random.word()
    })

    it('should call sign with correct values', async () => {
      await sut.generate({ key })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: '2d' })
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })
  })
})
