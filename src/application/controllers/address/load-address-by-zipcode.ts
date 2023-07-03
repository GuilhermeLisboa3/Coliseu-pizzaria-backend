import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'

type HttpRequest = { zipCode: string }

export class LoadAddressByZipCodeController extends Controller {
  async perform ({ zipCode }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }

  buildValidators ({ zipCode }: HttpRequest): Validator[] {
    return [
      ...Builder.of(zipCode, 'zipCode').required().build()
    ]
  }
}
