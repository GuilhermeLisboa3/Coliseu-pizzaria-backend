import { Controller } from '@/application/controllers'
import { AddAddressController } from '@/application/controllers/address'
import { makeAddAddress } from '@/main/factories/domain/use-cases/address'

export const makeAddAddressController = (): Controller => {
  return new AddAddressController(makeAddAddress())
}
