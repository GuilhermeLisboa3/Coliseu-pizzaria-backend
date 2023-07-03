import { LoadAddressByZipCode, loadAddressByZipCodeUseCase } from '@/domain/use-cases/address'
import { makeZipCodeApi } from '@/main/factories/infra/gateways'

export const makeLoadAddressByZipCode = (): LoadAddressByZipCode => {
  return loadAddressByZipCodeUseCase(makeZipCodeApi())
}
