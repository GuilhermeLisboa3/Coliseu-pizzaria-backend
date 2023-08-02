import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { HttpGetClient } from '@/infra/gateways/contracts/gateways'

export class ZipCodeApi {
  constructor (private readonly httpGetClient: HttpGetClient) {}

  async search ({ zipCode }: SearchAddressByZipCode.Input): Promise<SearchAddressByZipCode.Output> {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`
    const { status, data: { bairro, logradouro } } = await this.httpGetClient.get({ url })
    if (status !== 200) return undefined
    return { neighborhood: bairro, street: logradouro }
  }
}
