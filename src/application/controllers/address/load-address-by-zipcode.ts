import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = { zipCode: string }

export class LoadAddressByZipCodeController extends Controller {
  async perform ({ zipCode }: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, data: null }
  }
}
