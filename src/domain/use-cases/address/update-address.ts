import { CheckAddressByIdRepository, ListAddressRepository } from '@/domain/contracts/database/repositories/address'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (addressRepository: CheckAddressByIdRepository & ListAddressRepository) => UpdateAddress
type Input = { accountId: string, id: string, surname?: string, number?: number, complement?: string, active?: boolean }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = (addressRepository) => async ({ id, accountId, active }) => {
  const address = await addressRepository.checkById({ id })
  if (!address) throw new FieldNotFoundError('id')
  if (active) {
    await addressRepository.list({ accountId })
  }
}
