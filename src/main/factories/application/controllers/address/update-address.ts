import { Controller } from '@/application/controllers'
import { UpdateAddressController } from '@/application/controllers/address'
import { makeUpdateAddress } from '@/main/factories/domain/use-cases/address'

export const makeUpdateAddressController = (): Controller => {
  return new UpdateAddressController(makeUpdateAddress())
}
