import { AuthenticationMiddleware, Middleware } from '@/application/middlewares'
import { makeAuthorize } from '@/main/factories/domain/use-cases/account'

export const makeAuthenticationMiddleware = (): Middleware => {
  return new AuthenticationMiddleware(makeAuthorize())
}
