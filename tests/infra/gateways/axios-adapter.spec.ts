import { AxiosHttpClient } from '@/infra/gateways'

import axios from 'axios'
import faker from 'faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let url: string
  let data: string
  const fakeAxios = axios as jest.Mocked<typeof axios>

  beforeAll(() => {
    data = faker.random.objectElement()
    url = faker.internet.url()
    fakeAxios.get.mockResolvedValue(data)
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('should call get with correct values', async () => {
    await sut.get({ url })

    expect(fakeAxios.get).toHaveBeenCalledWith(url)
    expect(fakeAxios.get).toHaveBeenCalledTimes(1)
  })

  it('should return data on success', async () => {
    const result = await sut.get({ url })

    expect(result).toEqual(data)
  })
})
