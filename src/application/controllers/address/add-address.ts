import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'

type HttpRequest = { accountId: string, surname: string, zipCode: string, neighborhood: string, street: string, number: number, complement?: string }

export class AddAddressController extends Controller {
  async perform (input: HttpRequest): Promise<HttpResponse> {
    return { data: null, statusCode: 200 }
  }

  buildValidators ({ zipCode, neighborhood, number, street, surname }: HttpRequest): Validator[] {
    return [
      ...Builder.of(zipCode, 'zipCode').required().build(),
      ...Builder.of(neighborhood, 'neighborhood').required().build(),
      ...Builder.of(number, 'number').required().build(),
      ...Builder.of(street, 'street').required().build(),
      ...Builder.of(surname, 'surname').required().build()
    ]
  }
}
