import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { AddAddress } from '@/domain/use-cases/address'

type HttpRequest = { accountId: string, surname: string, zipCode: string, neighborhood: string, street: string, number: number, complement?: string }

export class AddAddressController extends Controller {
  constructor (private readonly addAddress: AddAddress) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    const address = await this.addAddress({ ...input })
    return ok(address)
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
