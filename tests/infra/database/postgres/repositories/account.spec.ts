import { AccountRepository } from '@/infra/database/postgres/repositories'
import { accountParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('AccountRepository', () => {
  let sut: AccountRepository
  const { email, name, password, id } = accountParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM "cartItems"`
    await prisma.$queryRaw`DELETE FROM carts`
    await prisma.$queryRaw`DELETE FROM users`
    await prisma.$queryRaw`DELETE FROM products`
    await prisma.$queryRaw`DELETE FROM categories`
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
      const result = await sut.create({ name, email, password })

      const user = await prisma.user.findFirst({ where: { email } })

      expect(result).toEqual({ id: user?.id })
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
    const role = 'any_admin'
    it('should return false if account does not exists', async () => {
      const result = await sut.checkByRole({ accountId: id })

      expect(result).toBe(false)
    })

    it('should return true if account exist', async () => {
      await prisma.user.create({ data: { id, name, email, password } })
      const result = await sut.checkByRole({ accountId: id })

      expect(result).toBe(true)
    })

    it('should return false if account exists with invalid role', async () => {
      await prisma.user.create({ data: { id, name, email, password } })

      const result = await sut.checkByRole({ accountId: id, role })

      expect(result).toBe(false)
    })

    it('should return true if route does not require role and account is admin', async () => {
      await prisma.user.create({ data: { id, name, email, password, role: 'admin' } })

      const result = await sut.checkByRole({ accountId: id })

      expect(result).toBe(true)
    })
  })
})
