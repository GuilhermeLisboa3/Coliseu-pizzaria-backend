import { Controller } from '@/application/controllers'
import { HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddAccount } from '@/domain/use-cases/account'

type HttpRequest = { name: string, email: string, password: string }

export class SignUpController extends Controller {
  constructor (private readonly addAccount: AddAccount) { super() }

  async perform ({ email, name, password }: HttpRequest): Promise<HttpResponse> {
    await this.addAccount({ email, name, password })
    return created()
  }

  buildValidators ({ name, email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build(),
      ...Builder.of(email, 'email').required().email().build(),
      ...Builder.of(password, 'password').required().min(5).build()
    ]
  }
}
