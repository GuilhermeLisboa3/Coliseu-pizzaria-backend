import { LoadAddressRepository } from '@/domain/contracts/database/repositories/address'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode, addressRepository: LoadAddressRepository) => AddAddress
type Input = { accountId: string, surname: string, zipCode: string, neighborhood: string, street: string, number: number, complement?: string }
type Output = void
export type AddAddress = (input: Input) => Promise<Output>

export const addAddressUseCase: Setup = (searchAddressByZipCode, addressRepository) => async ({ zipCode, accountId }) => {
  const address = await searchAddressByZipCode.search({ zipCode })
  if (!address) throw new FieldNotFoundError('zipCode')
  await addressRepository.load({ accountId })
}
