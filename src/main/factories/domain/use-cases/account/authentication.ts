import { Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { makeHashAdapter, makeJwtAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeAuthentication = (): Authentication => {
  return authenticationUseCase(makeAccountRepository(), makeHashAdapter(), makeJwtAdapter())
}
