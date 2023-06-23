import { makeAccountRepository } from '@/main/factories/infra/database/postgres/repositories'
import { makeJwtAdapter } from '@/main/factories/infra/gateways'
import { Authorize, AuthorizeUseCase } from '@/domain/use-cases/account'

export const makeAuthorize = (): Authorize =>
  AuthorizeUseCase(makeJwtAdapter(), makeAccountRepository())
