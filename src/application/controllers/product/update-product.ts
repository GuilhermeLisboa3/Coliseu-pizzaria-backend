import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { UpdateProduct } from '@/domain/use-cases/product'

type HttpRequest = { id: string, categoryId?: string, name?: string, description?: string, price?: number, file?: { buffer: Buffer, mimeType: string }, available?: boolean }

export class UpdateProductController extends Controller {
  constructor (private readonly updateProduct: UpdateProduct) { super() }

  async perform ({ categoryId, description, name, price, file, id, available }: HttpRequest): Promise<HttpResponse> {
    await this.updateProduct({ categoryId, description, name, price, file, id, available })
    return noContent()
  }

  buildValidators ({ id, file }: HttpRequest): Validator[] {
    return [
      ...Builder.of(id, 'id').required().build(),
      ...Builder.of(file, 'file').image({ AllowedMimeTypes: ['png', 'jpg'], maxSizeInMb: 10 }).build()
    ]
  }
}
