import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { id: string }

export class DeleteAddressController extends Controller {
  async perform (input: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
