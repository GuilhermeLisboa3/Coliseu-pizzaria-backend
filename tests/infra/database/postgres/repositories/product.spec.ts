import { ProductRepository } from '@/infra/database/postgres/repositories'
import { productParams } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('ProductRepository', () => {
  let sut: ProductRepository
  const { available, description, name, picture, price, id } = productParams

  beforeEach(async () => {
    await prisma.category.create({ data: { id, name } })
    sut = new ProductRepository()
  })

  describe('checkByName()', () => {
    it('should return true if email already exists', async () => {
      await prisma.product.create({ data: { available, description, name, picture, price, category_id: id } })

      const result = await sut.checkByName({ name })

      expect(result).toBe(true)
    })
  })
})
