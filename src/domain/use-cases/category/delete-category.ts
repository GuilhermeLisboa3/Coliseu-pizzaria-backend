import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'

type Setup = (CategoryRepository: CheckCategoryByIdRepository) => DeleteCategory
type Input = { id: string }
type Output = void
export type DeleteCategory = (input: Input) => Promise<Output>

export const deleteCategoryUseCase: Setup = (categoryRepository) => async ({ id }) => {
  await categoryRepository.checkById({ id })
}
