import { CategoryRepository } from '@/infra/database/postgres/repositories'
import { categoryParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('CategoryRepository', () => {
  let sut: CategoryRepository
  const { name } = categoryParams

  beforeEach(() => {
    sut = new CategoryRepository()
  })

  describe('checkByName()', () => {
    it('should return true if name already exists', async () => {
      await prisma.category.create({ data: { name } })

      const result = await sut.checkByName({ name })

      expect(result).toBe(true)
    })
  })
})
