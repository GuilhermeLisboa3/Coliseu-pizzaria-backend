import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'
import { ListAddresses } from '@/domain/use-cases/address'

export const makeListAddresses = (): ListAddresses =>
  makeAddressRepository().list.bind(makeAddressRepository())
