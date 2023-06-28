import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'

type HttpRequest = { id: string, categoryId?: string, name?: string, description?: string, price?: number, file?: { buffer: Buffer, mimeType: string }, available?: boolean }

export class UpdateProductController extends Controller {
  async perform ({ categoryId, description, name, price, file, id, available }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }

  buildValidators ({ id, file }: HttpRequest): Validator[] {
    return [
      ...Builder.of(id, 'id').required().build(),
      ...Builder.of(file, 'file').image({ AllowedMimeTypes: ['png', 'jpg'], maxSizeInMb: 10 }).build()
    ]
  }
}
