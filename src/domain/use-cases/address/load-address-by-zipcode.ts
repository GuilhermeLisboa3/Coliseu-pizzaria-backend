import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode) => LoadAddressByZipCode
type Input = { zipCode: string }
type Output = void
export type LoadAddressByZipCode = (input: Input) => Promise<Output>

export const loadAddressByZipCodeUseCase: Setup = searchAddressByZipCode => async ({ zipCode }) => {
  await searchAddressByZipCode.search({ zipCode })
}
