import { HttpResponse, forbidden, ok, serverError, unauthorized } from '@/application/helpers'
import { Middleware } from '@/application/middlewares/middleware'
import { AuthenticationError, PermissionError } from '@/domain/error'
import { Authorize } from '@/domain/use-cases/account'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly authorize: Authorize, private readonly role?: string) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse> {
    try {
      if (!authorization) return unauthorized()
      const [, accessToken] = authorization.split(' ')
      const { accountId } = await this.authorize({ accessToken, role: this.role })
      return ok({ accountId })
    } catch (error) {
      if (error instanceof AuthenticationError) return unauthorized()
      if (error instanceof PermissionError) return forbidden()
      return serverError(error)
    }
  }
}
