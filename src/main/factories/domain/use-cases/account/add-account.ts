import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { makeHashAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRepository, makeCartRepository } from '@/main/factories/infra/database/postgres/repositories'
export const makeAddAccount = (): AddAccount => {
  return addAccountUseCase(makeAccountRepository(), makeHashAdapter(), makeCartRepository())
}
