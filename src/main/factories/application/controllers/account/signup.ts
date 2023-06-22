import { Controller } from '@/application/controllers'
import { SignUpController } from '@/application/controllers/account'
import { makeAddAccount } from '@/main/factories/domain/use-cases/account'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeAddAccount())
}
