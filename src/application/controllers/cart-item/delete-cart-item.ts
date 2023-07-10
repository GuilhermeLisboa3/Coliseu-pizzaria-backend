import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { DeleteCartItem } from '@/domain/use-cases/cart-item'

type HttpRequest = { accountId: string, id: string }

export class DeleteCartItemController extends Controller {
  constructor (private readonly deleteCartItem: DeleteCartItem) { super() }

  async perform ({ accountId, id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteCartItem({ accountId, productId: id })
    return noContent()
  }
}
