import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { categoryId: string, name: string, description: string, price: number, file?: { buffer: Buffer, mimeType: string } }

export class AddProductController extends Controller {
  async perform ({ categoryId, description, name, price, file }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
