import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { AddCategory } from '@/domain/use-cases/category'

type HttpRequest = { name: string }

export class AddCategoryController extends Controller {
  constructor (private readonly addCategory: AddCategory) { super() }

  async perform ({ name }: HttpRequest): Promise<HttpResponse> {
    await this.addCategory({ name })
    return noContent()
  }

  buildValidators ({ name }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build()
    ]
  }
}
