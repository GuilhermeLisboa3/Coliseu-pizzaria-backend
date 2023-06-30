import { CategoryRepository } from '@/infra/database/postgres/repositories'
import { categoryParams, productParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('CategoryRepository', () => {
  let sut: CategoryRepository
  const { id, name } = categoryParams
  const { description, available, picture, price } = productParams

  beforeEach(async () => {
    await prisma.$queryRaw`DELETE FROM products`
    await prisma.$queryRaw`DELETE FROM categories`
    sut = new CategoryRepository()
  })
  describe('checkByName()', () => {
    it('should return true if name already exists', async () => {
      await prisma.category.create({ data: { name } })

      const result = await sut.checkByName({ name })

      expect(result).toBe(true)
    })

    it('should return false if name already not exist', async () => {
      const result = await sut.checkByName({ name })

      expect(result).toBe(false)
    })
  })

  describe('create()', () => {
    it('should return category on success', async () => {
      const category = await sut.create({ name })

      expect(category).toMatchObject({ name })
    })
  })

  describe('checkById()', () => {
    it('should return true if id already exists', async () => {
      await prisma.category.create({ data: { id, name } })

      const result = await sut.checkById({ id })

      expect(result).toBe(true)
    })

    it('should return false if id already not exist', async () => {
      const result = await sut.checkById({ id })

      expect(result).toBe(false)
    })
  })

  describe('delete()', () => {
    it('should delete category on success', async () => {
      await prisma.category.create({ data: { id, name } })

      await sut.delete({ id })

      expect(await prisma.category.findFirst({ where: { id } })).toBeNull()
    })
  })

  describe('list()', () => {
    it('should return category with product', async () => {
      await prisma.category.create({ data: { id, name } })
      await prisma.product.create({ data: { id, name, description, available, picture, price, category_id: id } })

      const listCategory = await sut.list()

      expect(listCategory).toEqual([{
        id,
        name,
        products: [{ id, name, description, available, picture, price, categoryId: id }]
      }])
    })

    it('should return empty array if not has category', async () => {
      const listCategory = await sut.list()

      expect(listCategory).toEqual([])
    })
  })
})
