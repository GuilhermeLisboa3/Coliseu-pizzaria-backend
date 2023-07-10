import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { accountId: string, id: string }

export class LoadCartWithProductsController extends Controller {
  async perform ({ accountId, id }: HttpRequest): Promise<HttpResponse> {
    return { data: null, statusCode: 200 }
  }
}
