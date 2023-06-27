import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { prisma } from '@/infra/database/postgres/helpers'

export class ProductRepository implements CheckProductByNameRepository {
  async checkByName ({ name }: CheckProductByNameRepository.Input): Promise<CheckProductByNameRepository.Output> {
    const isValid = await prisma.product.findFirst({ where: { name } })

    return isValid != null
  }
}
