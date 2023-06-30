import { prisma } from '@/infra/database/postgres/helpers/connection'
jest.mock('@/infra/database/postgres/helpers/connection', () => {
  return {
    prisma: jestPrisma.client
  }
})

beforeEach(async () => {
  await prisma.$queryRaw`DELETE FROM users`
  await prisma.$queryRaw`DELETE FROM categories`
  await prisma.$queryRaw`DELETE FROM products`
})
