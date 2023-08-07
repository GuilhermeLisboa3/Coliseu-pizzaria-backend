import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { HttpGetClient } from '@/infra/gateways/contracts/gateways'

export class ZipCodeApi {
  constructor (private readonly httpGetClient: HttpGetClient) {}

  async search ({ zipCode }: SearchAddressByZipCode.Input): Promise<SearchAddressByZipCode.Output> {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`
    const { status, data } = await this.httpGetClient.get({ url })
    if (status !== 200 || data.erro) return undefined
    return { neighborhood: data.bairro, street: data.logradouro }
  }
}
