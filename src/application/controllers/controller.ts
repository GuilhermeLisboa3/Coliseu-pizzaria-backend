import { badRequest, HttpResponse, serverError } from '@/application/helpers'
import { ValidationComposite, Validator } from '@/application/validation'

export abstract class Controller {
  abstract perform (httpRequest?: any): Promise<HttpResponse>

  buildValidators (httpRequest?: any): Validator[] { return [] }

  async handle (httpRequest?: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error) return badRequest(error)
    try {
      await this.perform(httpRequest)
      return { statusCode: 200, data: null }
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (httpRequest?: any): Error | undefined {
    return new ValidationComposite(this.buildValidators(httpRequest)).validate()
  }
}
