import { CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { FieldInUseError } from '@/domain/error'

type Setup = (CategoryRepository: CheckCategoryByNameRepository) => AddCategory
type Input = { name: string }
type Output = void
export type AddCategory = (input: Input) => Promise<Output>

export const addCategoryUseCase: Setup = (categoryRepository) => async ({ name }) => {
  const category = await categoryRepository.checkByName({ name })
  if (category) throw new FieldInUseError('name')
}
