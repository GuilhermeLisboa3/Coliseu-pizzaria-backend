import { addressParams } from '@/tests/mocks'
import { ZipCodeApi } from '@/infra/gateways'
import { HttpGetClient } from '@/infra/gateways/contracts/gateways'

import { mock } from 'jest-mock-extended'

describe('ZipCodeApi', () => {
  let sut: ZipCodeApi
  const httpGetClient = mock<HttpGetClient>()
  const { zipCode } = addressParams

  beforeEach(() => {
    sut = new ZipCodeApi(httpGetClient)
  })

  it('should call httpGetClient with correct values', async () => {
    await sut.search({ zipCode })

    expect(httpGetClient.get).toHaveBeenCalledWith({ url: `https://brasilapi.com.br/api/cep/v2/${zipCode}` })
    expect(httpGetClient.get).toHaveBeenCalledTimes(1)
  })
})
