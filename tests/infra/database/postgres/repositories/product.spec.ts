import { ProductRepository } from '@/infra/database/postgres/repositories'
import { productParams, resetDataBase } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('ProductRepository', () => {
  let sut: ProductRepository
  const { available, description, name, picture, price, id } = productParams

  beforeEach(async () => {
    await resetDataBase()
    await prisma.category.create({ data: { id, name } })
    sut = new ProductRepository()
  })

  describe('checkByName()', () => {
    it('should return true if email already exists', async () => {
      await prisma.product.create({ data: { available, description, name, picture, price, categoryId: id } })

      const result = await sut.checkByName({ name })

      expect(result).toBe(true)
    })

    it('should return false if name already not exist', async () => {
      const result = await sut.checkByName({ name })

      expect(result).toBe(false)
    })
  })

  describe('create()', () => {
    it('should create a account on success', async () => {
      await sut.create({ description, name, picture, price, categoryId: id })

      expect(await prisma.product.findFirst({ where: { name } })).toBeTruthy()
    })
  })

  describe('load()', () => {
    it('should return product on success', async () => {
      await prisma.product.create({ data: { id, available, description, name, picture, price, categoryId: id } })

      const product = await sut.load({ id })

      expect(product).toEqual({ id, available, description, name, picture, price, categoryId: id })
    })

    it('should return null if product already not exist', async () => {
      const product = await sut.load({ id })

      expect(product).toBeNull()
    })
  })

  describe('update()', () => {
    it('should return undefined on success', async () => {
      await prisma.product.create({ data: { id, available, description, name, picture, price, categoryId: id } })

      await sut.update({ id, name: 'any_name' })

      expect(await prisma.product.findFirst({ where: { name: 'any_name' } })).toBeTruthy()
    })
  })

  describe('delete()', () => {
    it('should delete product on success', async () => {
      await prisma.product.create({ data: { id, available, description, name, picture, price, categoryId: id } })

      await sut.delete({ id })

      expect(await prisma.product.findFirst({ where: { id } })).toBeNull()
    })
  })
})
