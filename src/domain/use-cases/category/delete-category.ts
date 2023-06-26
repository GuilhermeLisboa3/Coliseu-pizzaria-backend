import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (CategoryRepository: CheckCategoryByIdRepository) => DeleteCategory
type Input = { id: string }
type Output = void
export type DeleteCategory = (input: Input) => Promise<Output>

export const deleteCategoryUseCase: Setup = (categoryRepository) => async ({ id }) => {
  const category = await categoryRepository.checkById({ id })
  if (!category) throw new FieldNotFoundError('id')
}
