import { CategoryRepository } from '@/infra/database/postgres/repositories'
import { categoryParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('CategoryRepository', () => {
  let sut: CategoryRepository
  const { id, name } = categoryParams

  beforeEach(() => {
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
})
