import { AccountRepository } from '@/infra/database/postgres/repositories'
import { accountParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('AccountRepository', () => {
  let sut: AccountRepository
  const { email, name, password } = accountParams

  beforeEach(() => {
    sut = new AccountRepository()
  })

  describe('checkByEmail()', () => {
    it('should return false if email does not exists', async () => {
      const result = await sut.checkByEmail({ email })

      expect(result).toBe(false)
    })

    it('should return true if email already exists', async () => {
      await prisma.user.create({ data: { name, email, password } })

      const result = await sut.checkByEmail({ email })

      expect(result).toBe(true)
    })
  })
})
