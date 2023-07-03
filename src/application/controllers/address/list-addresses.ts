import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListAddresses } from '@/domain/use-cases/address'

type HttpRequest = { accountId: string }

export class ListAddressesController extends Controller {
  constructor (private readonly listAddresses: ListAddresses) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse> {
    const addresses = await this.listAddresses({ accountId })
    return ok(addresses)
  }
}
