import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'

type HttpRequest = { categoryId: string, name: string, description: string, price: number, file?: { buffer: Buffer, mimeType: string } }

export class AddProductController extends Controller {
  async perform ({ categoryId, description, name, price, file }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }

  buildValidators ({ name, categoryId, description, price, file }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build(),
      ...Builder.of(categoryId, 'categoryId').required().build(),
      ...Builder.of(description, 'description').required().build(),
      ...Builder.of(price, 'price').required().build(),
      ...Builder.of(file, 'file').image({ AllowedMimeTypes: ['png', 'jpg'], maxSizeInMb: 10 }).build()
    ]
  }
}
