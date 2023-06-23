import { Authorize, AuthorizeUseCase } from '@/domain/use-cases/account'
import { makeJwtAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeAuthorize = (): Authorize => {
  return AuthorizeUseCase(makeJwtAdapter(), makeAccountRepository())
}
