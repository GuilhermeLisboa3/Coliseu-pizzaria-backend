import { Controller } from '@/application/controllers'
import { DeleteAddressController } from '@/application/controllers/address'
import { makeDeleteAddress } from '@/main/factories/domain/use-cases/address'

export const makeDeleteAddressController = (): Controller => {
  return new DeleteAddressController(makeDeleteAddress())
}
