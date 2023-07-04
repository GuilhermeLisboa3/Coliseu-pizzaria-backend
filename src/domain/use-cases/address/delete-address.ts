import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (addressRepository: CheckAddressByIdRepository) => DeleteAddress
type Input = { id: string }
type Output = void
export type DeleteAddress = (input: Input) => Promise<Output>

export const deleteAddressUseCase: Setup = (addressRepository) => async ({ id }) => {
  const address = await addressRepository.checkById({ id })
  if (!address) throw new FieldNotFoundError('id')
}
