import { JwtAdapter } from '@/infra/gateways'

import jwt from 'jsonwebtoken'
import faker from 'faker'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let secret: string
  let token: string
  let error: Error
  const fakeJwt = jwt as jest.Mocked<typeof jwt>

  beforeAll(() => {
    secret = faker.datatype.uuid()
    token = faker.datatype.uuid()
    error = new Error(faker.random.word())
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)
  })

  describe('generate()', () => {
    let key: string

    beforeAll(() => {
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

    it('should rethrow if sign throw', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw error })

      const promise = sut.generate({ key })

      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('validate()', () => {
    let token: string
    let key: string

    beforeAll(() => {
      token = faker.datatype.uuid()
      key = faker.datatype.uuid()
      fakeJwt.verify.mockImplementation(() => ({ key }))
    })

    it('should call verify with correct values', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
    })

    it('should return a key on success', async () => {
      const result = await sut.validate({ token })

      expect(result).toBe(key)
    })

    it('should rethrow if verify throw', async () => {
      fakeJwt.verify.mockImplementationOnce(() => { throw error })

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow(error)
    })
  })
})
