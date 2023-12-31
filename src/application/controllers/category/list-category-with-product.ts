import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListCategoryWithProduct } from '@/domain/use-cases/category'

export class ListCategoryWithProductController extends Controller {
  constructor (private readonly listCategoryWithProduct: ListCategoryWithProduct) { super() }

  async perform (): Promise<HttpResponse> {
    const category = await this.listCategoryWithProduct()
    return ok(category)
  }
}
