import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { name: string, email: string, password: string }

export class LoginController extends Controller {
  async perform ({ email, name, password }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
