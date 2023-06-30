jest.mock('@/infra/database/postgres/helpers/connection', () => {
  return {
    prisma: jestPrisma.client
  }
})
