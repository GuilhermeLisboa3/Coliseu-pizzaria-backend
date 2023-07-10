import { AddressRepository } from '@/infra/database/postgres/repositories'
import { accountParams, addressParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('AddressRepository', () => {
  let sut: AddressRepository
  const { email, name, password, id } = accountParams
  const { active, complement, neighborhood, number, street, surname, zipCode } = addressParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM "cartItems"`
    await prisma.$queryRaw`DELETE FROM carts`
    await prisma.$queryRaw`DELETE FROM users`
    await prisma.$queryRaw`DELETE FROM products`
    await prisma.$queryRaw`DELETE FROM categories`
    await prisma.user.create({ data: { id, name, email, password } })
    sut = new AddressRepository()
  })

  describe('list()', () => {
    it('should return list empty if address not exists', async () => {
      const result = await sut.list({ accountId: id })

      expect(result).toEqual([])
    })

    it('should return address list', async () => {
      await prisma.address.create({ data: { id, active, complement, neighborhood, number, street, surname, zipCode, userId: id } })
      const result = await sut.list({ accountId: id })

      expect(result).toEqual([{ id, active, complement, neighborhood, number, street, surname, zipCode, accountId: id }])
    })
  })

  describe('create()', () => {
    it('should create address on success', async () => {
      const result = await sut.create({ accountId: id, active, complement, neighborhood, number, street, surname, zipCode })

      expect(result).toMatchObject({ accountId: id, active, complement, neighborhood, number, street, surname, zipCode })
    })
  })

  describe('checkById()', () => {
    it('should return false if address does not exists', async () => {
      const result = await sut.checkById({ id })

      expect(result).toBeFalsy()
    })

    it('should return true if address exists', async () => {
      await prisma.address.create({ data: { id, active, complement, neighborhood, number, street, surname, zipCode, userId: id } })

      const result = await sut.checkById({ id })

      expect(result).toBeTruthy()
    })
  })

  describe('delete()', () => {
    it('should delete address on success', async () => {
      await prisma.address.create({ data: { id, active, complement, neighborhood, number, street, surname, zipCode, userId: id } })

      await sut.delete({ id })

      expect(await prisma.address.findFirst({ where: { id } })).toBeNull()
    })
  })

  describe('update()', () => {
    it('should update address on success', async () => {
      await prisma.address.create({ data: { id, active, complement, neighborhood, number, street, surname, zipCode, userId: id } })

      await sut.update({ id, complement: 'any_value' })

      expect(await prisma.address.findFirst({ where: { id } })).toMatchObject({ complement: 'any_value' })
    })
  })
})
