import { Controller } from '@/application/controllers'
import { ListAddressesController } from '@/application/controllers/address'
import { makeListAddresses } from '@/main/factories/domain/use-cases/address'

export const makeListAddressesController = (): Controller => {
  return new ListAddressesController(makeListAddresses())
}
