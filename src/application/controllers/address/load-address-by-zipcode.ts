import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { LoadAddressByZipCode } from '@/domain/use-cases/address'

type HttpRequest = { zipCode: string }

export class LoadAddressByZipCodeController extends Controller {
  constructor (private readonly loadAddressByZipCode: LoadAddressByZipCode) { super() }

  async perform ({ zipCode }: HttpRequest): Promise<HttpResponse> {
    const address = await this.loadAddressByZipCode({ zipCode })
    return ok(address)
  }

  buildValidators ({ zipCode }: HttpRequest): Validator[] {
    return [
      ...Builder.of(zipCode, 'zipCode').required().build()
    ]
  }
}
