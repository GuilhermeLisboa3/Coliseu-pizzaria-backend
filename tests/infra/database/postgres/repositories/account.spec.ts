import { AccountRepository } from '@/infra/database/postgres/repositories'
import { accountParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('AccountRepository', () => {
  let sut: AccountRepository
  const { email, name, password, id } = accountParams

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

  describe('create()', () => {
    it('should create a account on success', async () => {
      await sut.create({ name, email, password })

      expect(await prisma.user.findFirst({ where: { email } })).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    it('should return null if acccount not exist', async () => {
      const account = await sut.loadByEmail({ email })

      expect(account).toBeNull()
    })

    it('should return account on success', async () => {
      await prisma.user.create({ data: { id, name, email, password } })
      const account = await sut.loadByEmail({ email })

      expect(account).toEqual({ id, name, email, password, role: 'user' })
    })
  })

  describe('checkByRole()', () => {
    it('should return false if account does not exists', async () => {
      const result = await sut.checkByRole({ accountId: id })

      expect(result).toBe(false)
    })
  })
})
