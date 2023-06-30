import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { FieldNotFoundError } from '@/domain/error'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode) => LoadAddressByZipCode
type Input = { zipCode: string }
type Output = { neighborhood: string, street: string }
export type LoadAddressByZipCode = (input: Input) => Promise<Output>

export const loadAddressByZipCodeUseCase: Setup = searchAddressByZipCode => async ({ zipCode }) => {
  const address = await searchAddressByZipCode.search({ zipCode })
  if (!address) throw new FieldNotFoundError('zipCode')
  return address
}
