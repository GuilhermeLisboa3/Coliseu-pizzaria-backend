import { HttpGetClient } from '@/infra/gateways/contracts/gateways'
import { AxiosHttpClient } from '@/infra/gateways'

export const makeAxiosHttpClient = (): HttpGetClient =>
  new AxiosHttpClient()
