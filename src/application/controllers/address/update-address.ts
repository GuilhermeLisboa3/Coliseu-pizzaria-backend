import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { accountId: string, id: string, surname?: string, number?: number, complement?: string, active?: boolean }

export class UpdateAddressController extends Controller {
  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
