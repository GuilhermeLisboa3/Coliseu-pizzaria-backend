import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { ListAddresses } from '@/domain/use-cases/address'

type HttpRequest = { accountId: string }

export class ListAddressesController extends Controller {
  constructor (private readonly listAddresses: ListAddresses) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse> {
    await this.listAddresses({ accountId })
    return { statusCode: 200, data: null }
  }
}
