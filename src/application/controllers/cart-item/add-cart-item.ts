import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { AddCartItem } from '@/domain/use-cases/cart-item'

type HttpRequest = { accountId: string, id: string }

export class AddCartItemController extends Controller {
  constructor (private readonly addCartItem: AddCartItem) { super() }

  async perform ({ accountId, id }: HttpRequest): Promise<HttpResponse> {
    const cartItem = await this.addCartItem({ accountId, productId: id })
    return ok(cartItem)
  }
}
