import { AxiosHttpClient } from '@/infra/gateways'

import axios from 'axios'
import faker from 'faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let url: string
  const fakeAxios = axios as jest.Mocked<typeof axios>

  beforeAll(() => {
    url = faker.internet.url()
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('should call get with correct values', async () => {
    await sut.get({ url })

    expect(fakeAxios.get).toHaveBeenCalledWith(url)
    expect(fakeAxios.get).toHaveBeenCalledTimes(1)
  })
})
