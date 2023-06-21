import { HttpResponse, badRequest } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { FieldInUseError } from '@/domain/error'
import { AddAccount } from '@/domain/use-cases/account'

type HttpRequest = { name: string, email: string, password: string }

export class SignUpController {
  constructor (private readonly addAccount: AddAccount) {}

  async perform ({ email, name, password }: HttpRequest): Promise<HttpResponse> {
    try {
      await this.addAccount({ email, name, password })
      return { statusCode: 200, data: null }
    } catch (error) {
      return badRequest(new FieldInUseError('name'))
    }
  }

  buildValidators ({ name, email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build(),
      ...Builder.of(email, 'email').required().email().build(),
      ...Builder.of(password, 'password').required().min(5).build()
    ]
  }
}
