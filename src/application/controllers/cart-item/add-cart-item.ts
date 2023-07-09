import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { accountId: string, productId: string }

export class AddCartItemController extends Controller {
  async perform ({ accountId, productId }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
