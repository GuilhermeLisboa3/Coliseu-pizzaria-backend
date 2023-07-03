import { Controller } from '@/application/controllers'
import { LoadAddressByZipCodeController } from '@/application/controllers/address'
import { makeLoadAddressByZipCode } from '@/main/factories/domain/use-cases/address'

export const makeLoadAddressByZipCodeController = (): Controller => {
  return new LoadAddressByZipCodeController(makeLoadAddressByZipCode())
}
