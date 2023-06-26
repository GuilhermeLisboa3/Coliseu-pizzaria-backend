import { CheckCategoryByNameRepository, AddCategoryRepository, CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { prisma } from '@/infra/database/postgres/helpers'

export class CategoryRepository implements CheckCategoryByNameRepository, AddCategoryRepository, CheckCategoryByIdRepository {
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
}
