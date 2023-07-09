import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { AddCartItem } from '@/domain/use-cases/cart-item'

type HttpRequest = { accountId: string, productId: string }

export class AddCartItemController extends Controller {
  constructor (private readonly addCartItem: AddCartItem) { super() }

  async perform ({ accountId, productId }: HttpRequest): Promise<HttpResponse> {
    await this.addCartItem({ accountId, productId })
    return { statusCode: 200, data: null }
  }
}
