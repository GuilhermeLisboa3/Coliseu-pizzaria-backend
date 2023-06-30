import { addressParams } from '@/tests/mocks'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { loadAddressByZipCodeUseCase, LoadAddressByZipCode } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('loadAddressByZipCodeUseCase', () => {
  let sut: LoadAddressByZipCode

  const { zipCode } = addressParams

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeEach(() => {
    sut = loadAddressByZipCodeUseCase(searchAddressByZipCode)
  })

  it('should call SearchAddressByZipCode with correct value', async () => {
    await sut({ zipCode })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })
})
