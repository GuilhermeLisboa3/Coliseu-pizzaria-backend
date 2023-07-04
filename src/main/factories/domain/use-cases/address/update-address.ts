import { updateAddressUseCase, UpdateAddress } from '@/domain/use-cases/address'
import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeUpdateAddress = (): UpdateAddress => {
  return updateAddressUseCase(makeAddressRepository())
}
