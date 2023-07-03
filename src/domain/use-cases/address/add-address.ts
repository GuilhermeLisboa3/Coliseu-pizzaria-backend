import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode) => AddAddress
type Input = { accountId: string, surname: string, zipCode: string, neighborhood: string, street: string, number: number, complement?: string }
type Output = void
export type AddAddress = (input: Input) => Promise<Output>

export const addAddressUseCase: Setup = searchAddressByZipCode => async ({ zipCode }) => {
  await searchAddressByZipCode.search({ zipCode })
}
