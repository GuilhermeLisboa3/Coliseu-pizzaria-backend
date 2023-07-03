import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { accountId: string, surname: string, zipCode: string, neighborhood: string, street: string, number: number, complement?: string }

export class AddAddressController extends Controller {
  async perform (input: HttpRequest): Promise<HttpResponse> {
    return { data: null, statusCode: 200 }
  }
}
