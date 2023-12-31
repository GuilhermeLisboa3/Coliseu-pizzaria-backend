import { AddAddressRepository, ListAddressRepository } from '@/domain/contracts/database/repositories/address'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode, addressRepository: ListAddressRepository & AddAddressRepository) => AddAddress
type Input = { accountId: string, surname: string, zipCode: string, neighborhood: string, street: string, number: number, complement?: string }
type Output = { id: string, accountId: string, surname: string, zipCode: string, neighborhood: string, street: string, number: number, complement?: string }
export type AddAddress = (input: Input) => Promise<Output>

export const addAddressUseCase: Setup = (searchAddressByZipCode, addressRepository) => async ({ zipCode, accountId, ...input }) => {
  const address = await searchAddressByZipCode.search({ zipCode })
  if (!address) throw new FieldNotFoundError('zipCode')
  const addresses = await addressRepository.list({ accountId })
  let active = false
  if (!addresses.length) active = true
  return await addressRepository.create({ zipCode, accountId, active, ...input })
}
