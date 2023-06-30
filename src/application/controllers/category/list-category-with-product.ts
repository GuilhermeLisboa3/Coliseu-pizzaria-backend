import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { ListCategoryWithProduct } from '@/domain/use-cases/category'

export class ListCategoryWithProductController extends Controller {
  constructor (private readonly listCategoryWithProduct: ListCategoryWithProduct) { super() }

  async perform (): Promise<HttpResponse> {
    await this.listCategoryWithProduct()
    return { statusCode: 200, data: null }
  }
}
