import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { Authentication } from '@/domain/use-cases/account'

type HttpRequest = { email: string, password: string }

export class LoginController extends Controller {
  constructor (private readonly authentication: Authentication) { super() }

  async perform ({ email, password }: HttpRequest): Promise<HttpResponse> {
    await this.authentication({ email, password })
    return { statusCode: 200, data: null }
  }

  buildValidators ({ email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of(email, 'email').required().email().build(),
      ...Builder.of(password, 'password').required().min(5).build()
    ]
  }
}
