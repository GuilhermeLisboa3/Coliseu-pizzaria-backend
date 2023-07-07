import { CheckProductByNameRepository, AddProductRepository, LoadProductRepository, UpdateProductRepository, DeleteProductRepository } from '@/domain/contracts/database/repositories/product'
import { prisma, PrismaHelper } from '@/infra/database/postgres/helpers'

export class ProductRepository implements CheckProductByNameRepository, AddProductRepository, LoadProductRepository, UpdateProductRepository, DeleteProductRepository {
  async checkByName ({ name }: CheckProductByNameRepository.Input): Promise<CheckProductByNameRepository.Output> {
    const isValid = await prisma.product.findFirst({ where: { name } })

    return isValid != null
  }

  async create ({ name, categoryId, description, price, picture }: AddProductRepository.Input): Promise<AddProductRepository.Output> {
    await prisma.product.create({ data: { name, categoryId: categoryId, description, price, available: true, picture } })
  }

  async load ({ id }: LoadProductRepository.Input): Promise<LoadProductRepository.Output> {
    const product = await prisma.product.findFirst({
      where: { id },
      select: { id: true, available: true, description: true, price: true, name: true, picture: true, categoryId: true }
    })
    if (product) return PrismaHelper.productMap(product)
    return null
  }

  async update ({ name, categoryId, description, price, picture, id, available }: UpdateProductRepository.Input): Promise<UpdateProductRepository.Output> {
    await prisma.product.update({
      where: { id },
      data: { name, categoryId: categoryId, description, price, picture, id, available }
    })
  }

  async delete ({ id }: DeleteProductRepository.Input): Promise<DeleteProductRepository.Output> {
    await prisma.product.delete({ where: { id } })
  }
}
