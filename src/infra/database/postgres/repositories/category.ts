import { CheckCategoryByNameRepository, AddCategoryRepository, CheckCategoryByIdRepository, DeleteCategoryRepository, ListCategoryWithProductRepository } from '@/domain/contracts/database/repositories/category'
import { PrismaHelper, prisma } from '@/infra/database/postgres/helpers'

export class CategoryRepository implements CheckCategoryByNameRepository, AddCategoryRepository, CheckCategoryByIdRepository, DeleteCategoryRepository, ListCategoryWithProductRepository {
  async checkByName ({ name }: CheckCategoryByNameRepository.Input): Promise<CheckCategoryByNameRepository.Output> {
    const isValid = await prisma.category.findFirst({ where: { name } })

    return isValid != null
  }

  async create ({ name }: AddCategoryRepository.Input): Promise<AddCategoryRepository.Output> {
    const category = await prisma.category.create({ data: { name } })

    return category
  }

  async checkById ({ id }: CheckCategoryByIdRepository.Input): Promise<CheckCategoryByIdRepository.Output> {
    const isValid = await prisma.category.findFirst({ where: { id } })

    return isValid != null
  }

  async delete ({ id }: DeleteCategoryRepository.Input): Promise<DeleteCategoryRepository.Output> {
    await prisma.category.delete({ where: { id } })
  }

  async list (): Promise<ListCategoryWithProductRepository.Output> {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        product: { select: { id: true, available: true, description: true, price: true, name: true, picture: true, categoryId: true } }
      }
    })
    return categories.map(category => {
      return {
        id: category.id,
        name: category.name,
        products: category.product.map(product => PrismaHelper.productMap(product))
      }
    })
  }
}
