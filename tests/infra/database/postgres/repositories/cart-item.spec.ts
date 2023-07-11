import { CartItemRepository } from '@/infra/database/postgres/repositories'
import { accountParams, productParams, resetDataBase } from '@/tests/mocks'
import { prisma } from '@/infra/database/postgres/helpers'

describe('CartItemRepository', () => {
  let sut: CartItemRepository
  const { id, email, name, password } = accountParams
  const { available, description, picture, price } = productParams

  beforeEach(async () => {
    await resetDataBase()
    await prisma.user.create({ data: { id, name, password, email } })
    await prisma.cart.create({ data: { id, userId: id } })
    await prisma.category.create({ data: { id, name } })
    await prisma.product.create({ data: { id, available, description, name, picture, price, categoryId: id } })
    sut = new CartItemRepository()
  })

  describe('create()', () => {
    it('should create a cart item on success', async () => {
      const result = await sut.create({ cartId: id, productId: id })

      expect(result).toMatchObject({ cartId: id, productId: id, quantity: 1 })
    })
  })

  describe('load()', () => {
    it('should return a cart item on success', async () => {
      await prisma.cartItem.create({ data: { cartId: id, productId: id, quantity: 1 } })

      const result = await sut.load({ cartId: id, productId: id })

      expect(result).toMatchObject({ cartId: id, productId: id, quantity: 1 })
    })

    it('should return null if not cart item exists', async () => {
      const result = await sut.load({ cartId: id, productId: id })

      expect(result).toBeNull()
    })
  })

  describe('update()', () => {
    it('should return a cart item on success', async () => {
      await prisma.cartItem.create({ data: { id, cartId: id, productId: id, quantity: 1 } })

      const result = await sut.update({ id, quantity: 2 })

      expect(result).toMatchObject({ id, cartId: id, productId: id, quantity: 2 })
    })
  })

  describe('delete()', () => {
    it('should return undefined on success', async () => {
      await prisma.cartItem.create({ data: { id, cartId: id, productId: id, quantity: 1 } })

      const result = await sut.delete({ id })

      expect(result).toBeUndefined()
    })
  })
})
