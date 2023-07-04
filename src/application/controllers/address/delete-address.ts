import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { DeleteAddress } from '@/domain/use-cases/address'

type HttpRequest = { id: string }

export class DeleteAddressController extends Controller {
  constructor (private readonly deleteAddress: DeleteAddress) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteAddress({ id })
    return { statusCode: 200, data: null }
  }
}
