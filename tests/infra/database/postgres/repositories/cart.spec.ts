import { CartRepository } from '@/infra/database/postgres/repositories'
import { accountParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('CartRepository', () => {
  let sut: CartRepository
  const { id, email, name, password } = accountParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM users`
    await prisma.user.create({ data: { id, name, password, email } })
    sut = new CartRepository()
  })

  describe('create()', () => {
    it('should create a cart on success', async () => {
      const result = await sut.create({ accountId: id })

      expect(result).toMatchObject({ accountId: id })
    })
  })

  describe('load()', () => {
    it('should return cart on success', async () => {
      await prisma.cart.create({ data: { id, userId: id } })

      const result = await sut.load({ accountId: id })

      expect(result).toEqual({ id, accountId: id })
    })
  })
})
