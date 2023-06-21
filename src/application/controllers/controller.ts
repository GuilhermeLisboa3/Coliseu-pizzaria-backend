import { badRequest, HttpResponse } from '@/application/helpers'
import { ValidationComposite, Validator } from '@/application/validation'

export abstract class Controller {
  abstract perform (httpRequest?: any): Promise<HttpResponse>

  buildValidators (httpRequest?: any): Validator[] { return [] }

  async handle (httpRequest?: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error) return badRequest(error)
    return { statusCode: 200, data: null }
  }

  private validate (httpRequest?: any): Error | undefined {
    return new ValidationComposite(this.buildValidators(httpRequest)).validate()
  }
}
