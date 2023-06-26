import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { name: string }

export class AddCategoryController extends Controller {
  async perform ({ name }: HttpRequest): Promise<HttpResponse> {
    return { data: null, statusCode: 200 }
  }
}
