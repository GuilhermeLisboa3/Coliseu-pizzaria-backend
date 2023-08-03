import { CartRepository } from '@/infra/database/postgres/repositories'
import { accountParams, productParams, resetDataBase } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('CartRepository', () => {
  let sut: CartRepository
  const { id, email, name, password } = accountParams
  const { available, description, picture, price } = productParams

  beforeEach(async () => {
    await resetDataBase()
    await prisma.user.create({ data: { id, name, password, email } })
    await prisma.category.create({ data: { id, name } })
    await prisma.product.create({ data: { id, available, description, name, picture, price, categoryId: id } })
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

    it('should return null if not cart exists', async () => {
      const result = await sut.load({ accountId: id })

      expect(result).toBeNull()
    })
  })

  describe('loadWithProducts()', () => {
    it('should return cart with products on success', async () => {
      await prisma.cart.create({ data: { id, userId: id } })
      await prisma.cartItem.create({ data: { id, cartId: id, productId: id, quantity: 3 } })

      const result = await sut.loadWithProducts({ accountId: id })

      expect(result).toEqual({
        id,
        accountId: id,
        products: [{ id, name, description, available, picture, price, categoryId: id, quantity: 3, categoryName: name }]
      })
    })

    it('should return null if cart not exists', async () => {
      const result = await sut.loadWithProducts({ accountId: id })

      expect(result).toBeNull()
    })
  })
})
