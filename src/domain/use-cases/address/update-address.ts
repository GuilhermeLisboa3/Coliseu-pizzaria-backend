import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'

type Setup = (addressRepository: CheckAddressByIdRepository) => UpdateAddress
type Input = { accountId: string, id: string, surname?: string, number?: number, complement?: string, active?: boolean }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = (addressRepository) => async ({ id }) => {
  await addressRepository.checkById({ id })
}
