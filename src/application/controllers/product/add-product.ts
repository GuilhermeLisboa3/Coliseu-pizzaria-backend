import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { AddProduct } from '@/domain/use-cases/product'

type HttpRequest = { categoryId: string, name: string, description: string, price: number, file?: { buffer: Buffer, mimeType: string } }

export class AddProductController extends Controller {
  constructor (private readonly addProduct: AddProduct) { super() }

  async perform ({ categoryId, description, name, price, file }: HttpRequest): Promise<HttpResponse> {
    await this.addProduct({ categoryId, description, name, price, file })
    return noContent()
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
