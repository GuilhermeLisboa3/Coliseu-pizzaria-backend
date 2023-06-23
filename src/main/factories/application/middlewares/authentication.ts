import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeAuthorize } from '@/main/factories/domain/use-cases/account'

export const makeAuthenticationMiddleware = (role?: string): AuthenticationMiddleware =>
  new AuthenticationMiddleware(makeAuthorize(), role)
