import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { accountId: string, id: string }

export class DeleteCartItemController extends Controller {
  async perform ({ accountId, id }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
