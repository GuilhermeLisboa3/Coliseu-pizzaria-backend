import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'

type HttpRequest = { email: string, password: string }

export class LoginController extends Controller {
  async perform ({ email, password }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }

  buildValidators ({ email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of(email, 'email').required().email().build(),
      ...Builder.of(password, 'password').required().min(5).build()
    ]
  }
}
