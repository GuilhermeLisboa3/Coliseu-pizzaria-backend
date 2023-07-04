import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { UpdateAddress } from '@/domain/use-cases/address'

type HttpRequest = { accountId: string, id: string, surname?: string, number?: number, complement?: string, active?: boolean }

export class UpdateAddressController extends Controller {
  constructor (private readonly updateAddress: UpdateAddress) { super() }

  async perform ({ id, accountId, active, complement, number, surname }: HttpRequest): Promise<HttpResponse> {
    await this.updateAddress({ id, accountId, active, complement, number, surname })
    return noContent()
  }

  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...Builder.of(id, 'id').required().build()
    ]
  }
}
