import { AddAddress, addAddressUseCase } from '@/domain/use-cases/address'
import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'
import { makeZipCodeApi } from '@/main/factories/infra/gateways'

export const makeAddAddress = (): AddAddress => {
  return addAddressUseCase(makeZipCodeApi(), makeAddressRepository())
}
