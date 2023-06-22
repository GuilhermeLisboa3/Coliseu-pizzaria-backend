import { Controller } from '@/application/controllers'
import { LoginController } from '@/application/controllers/account'
import { makeAuthentication } from '@/main/factories/domain/use-cases/account'

export const makeLoginController = (): Controller => {
  return new LoginController(makeAuthentication())
}
