import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = { name: string, email: string, password: string }

export class SignUpController {
  buildValidators ({ name, email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build(),
      ...Builder.of(email, 'email').required().email().build(),
      ...Builder.of(password, 'password').required().min(5).build()
    ]
  }
}
