import { BcryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcrypt'
import faker from 'faker'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter

  let plaintext: string
  let digest: string

  const fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    plaintext = faker.random.word()
    digest = faker.datatype.uuid()
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
  })
})
