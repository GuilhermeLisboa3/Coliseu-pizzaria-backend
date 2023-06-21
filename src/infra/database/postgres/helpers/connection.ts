import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export class PgConnection {
  client: boolean = false
  async connect (): Promise<void> {
    if (!this.client) {
      await prisma.$connect()
    }
  }

  async disconnect (): Promise<void> {
    if (this.client) {
      await prisma.$disconnect()
    }
  }
}
