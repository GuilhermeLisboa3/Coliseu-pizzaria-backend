import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { id: string, categoryId?: string, name?: string, description?: string, price?: number, file?: { buffer: Buffer, mimeType: string }, available?: boolean }

export class UpdateProductController extends Controller {
  async perform ({ categoryId, description, name, price, file, id, available }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
