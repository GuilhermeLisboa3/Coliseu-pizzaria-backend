import { makeAxiosHttpClient } from '.'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { ZipCodeApi } from '@/infra/gateways'

export const makeZipCodeApi = (): SearchAddressByZipCode =>
  new ZipCodeApi(makeAxiosHttpClient())
