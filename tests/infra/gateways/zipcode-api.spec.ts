import { addressParams } from '@/tests/mocks'
import { ZipCodeApi } from '@/infra/gateways'
import { HttpGetClient } from '@/infra/gateways/contracts/gateways'

import { mock } from 'jest-mock-extended'

describe('ZipCodeApi', () => {
  let sut: ZipCodeApi
  const httpGetClient = mock<HttpGetClient>()
  const { zipCode } = addressParams

  beforeAll(() => {
    httpGetClient.get.mockResolvedValue({ status: 200 })
  })

  beforeEach(() => {
    sut = new ZipCodeApi(httpGetClient)
  })

  it('should call httpGetClient with correct values', async () => {
    await sut.search({ zipCode })

    expect(httpGetClient.get).toHaveBeenCalledWith({ url: `https://brasilapi.com.br/api/cep/v2/${zipCode}` })
    expect(httpGetClient.get).toHaveBeenCalledTimes(1)
  })

  it('should return undefined if httpGetClient returns status different 200', async () => {
    httpGetClient.get.mockResolvedValueOnce({ status: 400 })
    const result = await sut.search({ zipCode })

    expect(result).toBeUndefined()
  })
})
