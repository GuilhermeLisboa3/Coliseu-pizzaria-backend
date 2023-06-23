import { HttpResponse, unauthorized } from '@/application/helpers'
import { Middleware } from '@/application/middlewares/middleware'
import { Authorize } from '@/domain/use-cases/account'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly authorize: Authorize, private readonly role?: string) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse> {
    if (!authorization) return unauthorized()
    const [, accessToken] = authorization.split(' ')
    await this.authorize({ accessToken, role: this.role })
    return { statusCode: 200, data: null }
  }
}
