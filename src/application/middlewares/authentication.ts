import { HttpResponse, unauthorized } from '@/application/helpers'
import { Middleware } from '@/application/middlewares/middleware'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware implements Middleware {
  async handle ({ authorization }: HttpRequest): Promise<HttpResponse> {
    if (!authorization) return unauthorized()
    return { statusCode: 200, data: null }
  }
}
