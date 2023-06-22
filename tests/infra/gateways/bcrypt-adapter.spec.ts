import { BcryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcrypt'
import faker from 'faker'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter

  let plaintext: string
  let digest: string
  let error: Error

  const fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    plaintext = faker.random.word()
    digest = faker.datatype.uuid()
    error = new Error(faker.random.words(7))
  })

  beforeEach(() => {
    sut = new BcryptAdapter()
  })

  describe('generate()', () => {
    const salt = 12

    beforeAll(() => {
      fakeBcrypt.hash.mockImplementation(() => digest)
    })

    it('should call hash with correct values', async () => {
      await sut.generate({ plaintext })

      expect(fakeBcrypt.hash).toHaveBeenCalledWith(plaintext, salt)
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1)
    })

    it('should rethrow if hash throw', async () => {
      fakeBcrypt.hash.mockImplementationOnce(() => { throw error })

      const promise = sut.generate({ plaintext })

      await expect(promise).rejects.toThrow(error)
    })

    it('should return a digest on success', async () => {
      const hashed = await sut.generate({ plaintext })

      expect(hashed).toBe(digest)
    })
  })

  describe('compare()', () => {
    beforeAll(() => {
      fakeBcrypt.compare.mockImplementation(() => true)
    })

    it('should call compare with correct values', async () => {
      await sut.compare({ plaintext, digest })

      expect(fakeBcrypt.compare).toHaveBeenCalledWith(plaintext, digest)
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1)
    })

    it('should return true when compare succeeds', async () => {
      await sut.compare({ plaintext, digest })

      expect(fakeBcrypt.compare).toHaveBeenCalledWith(plaintext, digest)
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1)
    })

    it('should return false when compare fails', async () => {
      fakeBcrypt.compare.mockImplementationOnce(() => false)
      await sut.compare({ plaintext, digest })

      expect(fakeBcrypt.compare).toHaveBeenCalledWith(plaintext, digest)
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1)
    })
  })
})
