import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { LoadCartWithProducts } from '@/domain/use-cases/cart'

type HttpRequest = { accountId: string }

export class LoadCartWithProductsController extends Controller {
  constructor (private readonly loadCartWithProducts: LoadCartWithProducts) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse> {
    const cartWithProducts = await this.loadCartWithProducts({ accountId })
    return ok(cartWithProducts)
  }
}
