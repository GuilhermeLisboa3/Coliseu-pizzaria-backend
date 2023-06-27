import { CheckProductByNameRepository, AddProductRepository } from '@/domain/contracts/database/repositories/product'
import { prisma } from '@/infra/database/postgres/helpers'

export class ProductRepository implements CheckProductByNameRepository, AddProductRepository {
  async checkByName ({ name }: CheckProductByNameRepository.Input): Promise<CheckProductByNameRepository.Output> {
    const isValid = await prisma.product.findFirst({ where: { name } })

    return isValid != null
  }

  async create ({ name, categoryId, description, price, picture }: AddProductRepository.Input): Promise<AddProductRepository.Output> {
    await prisma.product.create({ data: { name, category_id: categoryId, description, price, available: true, picture } })
  }
}
