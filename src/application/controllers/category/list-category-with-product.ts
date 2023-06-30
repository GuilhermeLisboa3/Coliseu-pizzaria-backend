import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

export class ListCategoryWithProductController extends Controller {
  async perform (): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
