import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { HttpGetClient } from '@/infra/gateways/contracts/gateways'

export class ZipCodeApi {
  constructor (private readonly httpGetClient: HttpGetClient) {}

  async search ({ zipCode }: SearchAddressByZipCode.Input): Promise<SearchAddressByZipCode.Output> {
    const url = `https://brasilapi.com.br/api/cep/v2/${zipCode}`
    const { status, data: { neighborhood, street } } = await this.httpGetClient.get({ url })
    if (status !== 200) return undefined
    return { neighborhood, street }
  }
}
