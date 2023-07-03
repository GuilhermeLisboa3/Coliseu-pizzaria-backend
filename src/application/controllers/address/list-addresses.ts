import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { accountId: string }

export class ListAddressesController extends Controller {
  async perform (input: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
