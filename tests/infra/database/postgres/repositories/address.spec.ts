import { AddressRepository } from '@/infra/database/postgres/repositories'
import { accountParams, addressParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('AddressRepository', () => {
  let sut: AddressRepository
  const { email, name, password, id } = accountParams
  const { active, complement, neighborhood, number, street, surname, zipCode } = addressParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM users`
    await prisma.$queryRaw`DELETE FROM addresses`
    await prisma.user.create({ data: { id, name, email, password } })
    sut = new AddressRepository()
  })

  describe('list()', () => {
    it('should return list empty if address not exists', async () => {
      const result = await sut.list({ accountId: id })

      expect(result).toEqual([])
    })

    it('should return address list', async () => {
      await prisma.address.create({ data: { id, active, complement, neighborhood, number, street, surname, zipCode, user_id: id } })
      const result = await sut.list({ accountId: id })

      expect(result).toEqual([{ id, active, complement, neighborhood, number, street, surname, zipCode, accountId: id }])
    })
  })
})
