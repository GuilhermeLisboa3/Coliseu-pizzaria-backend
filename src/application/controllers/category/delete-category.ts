import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { id: string }

export class DeleteCategoryController extends Controller {
  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
