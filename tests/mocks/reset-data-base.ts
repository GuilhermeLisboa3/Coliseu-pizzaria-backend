import { prisma } from '@/infra/database/postgres/helpers'

export const resetDataBase = async (): Promise<void> => {
  await prisma.$queryRaw`DELETE FROM "cartItems"`
  await prisma.$queryRaw`DELETE FROM carts`
  await prisma.$queryRaw`DELETE FROM addresses`
  await prisma.$queryRaw`DELETE FROM users`
  await prisma.$queryRaw`DELETE FROM products`
  await prisma.$queryRaw`DELETE FROM categories`
}
