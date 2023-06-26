import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'

type HttpRequest = { name: string }

export class AddCategoryController extends Controller {
  async perform ({ name }: HttpRequest): Promise<HttpResponse> {
    return { data: null, statusCode: 200 }
  }

  buildValidators ({ name }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build()
    ]
  }
}
