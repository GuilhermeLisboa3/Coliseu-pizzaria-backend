import { CheckProductByNameRepository, AddProductRepository, LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { prisma, PrismaoHelper } from '@/infra/database/postgres/helpers'

export class ProductRepository implements CheckProductByNameRepository, AddProductRepository, LoadProductRepository {
  async checkByName ({ name }: CheckProductByNameRepository.Input): Promise<CheckProductByNameRepository.Output> {
    const isValid = await prisma.product.findFirst({ where: { name } })

    return isValid != null
  }

  async create ({ name, categoryId, description, price, picture }: AddProductRepository.Input): Promise<AddProductRepository.Output> {
    await prisma.product.create({ data: { name, category_id: categoryId, description, price, available: true, picture } })
  }

  async load ({ id }: LoadProductRepository.Input): Promise<LoadProductRepository.Output> {
    const product = await prisma.product.findFirst({
      where: { id },
      select: { id: true, available: true, description: true, price: true, name: true, picture: true, category_id: true }
    })
    if (product) return PrismaoHelper.productMap(product)
    return null
  }
}
