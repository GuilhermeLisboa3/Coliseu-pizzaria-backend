import { CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { prisma } from '@/infra/database/postgres/helpers'

export class CategoryRepository implements CheckCategoryByNameRepository {
  async checkByName ({ name }: CheckCategoryByNameRepository.Input): Promise<CheckCategoryByNameRepository.Output> {
    const isValid = await prisma.category.findFirst({ where: { name } })

    return isValid != null
  }
}
