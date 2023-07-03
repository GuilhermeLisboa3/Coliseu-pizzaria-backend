import { AddressRepository } from '@/infra/database/postgres/repositories'
import { accountParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('AddressRepository', () => {
  let sut: AddressRepository
  const { email, name, password, id } = accountParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM users`
    await prisma.user.create({ data: { id, name, email, password } })
    sut = new AddressRepository()
  })

  describe('list()', () => {
    it('should return array empty if address not exists', async () => {
      const result = await sut.list({ accountId: id })

      expect(result).toEqual([])
    })
  })
})
