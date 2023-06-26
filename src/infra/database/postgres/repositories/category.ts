import { CheckCategoryByNameRepository, AddCategoryRepository } from '@/domain/contracts/database/repositories/category'
import { prisma } from '@/infra/database/postgres/helpers'

export class CategoryRepository implements CheckCategoryByNameRepository, AddCategoryRepository {
  async checkByName ({ name }: CheckCategoryByNameRepository.Input): Promise<CheckCategoryByNameRepository.Output> {
    const isValid = await prisma.category.findFirst({ where: { name } })

    return isValid != null
  }

  async create ({ name }: AddCategoryRepository.Input): Promise<AddCategoryRepository.Output> {
    const category = await prisma.category.create({ data: { name } })

    return category
  }
}
