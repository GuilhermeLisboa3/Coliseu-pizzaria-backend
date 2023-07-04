import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'

type HttpRequest = { accountId: string, id: string, surname?: string, number?: number, complement?: string, active?: boolean }

export class UpdateAddressController extends Controller {
  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }

  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...Builder.of(id, 'id').required().build()
    ]
  }
}
