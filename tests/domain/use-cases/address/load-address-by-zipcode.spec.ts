import { addressParams } from '@/tests/mocks'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { loadAddressByZipCodeUseCase, LoadAddressByZipCode } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'

describe('loadAddressByZipCodeUseCase', () => {
  let sut: LoadAddressByZipCode

  const { zipCode, neighborhood, street, error } = addressParams

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeAll(() => {
    searchAddressByZipCode.search.mockResolvedValue({ neighborhood, street })
  })

  beforeEach(() => {
    sut = loadAddressByZipCodeUseCase(searchAddressByZipCode)
  })

  it('should call SearchAddressByZipCode with correct value', async () => {
    await sut({ zipCode })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if SearchAddressByZipCode return undefined', async () => {
    searchAddressByZipCode.search.mockResolvedValueOnce(undefined)

    const promise = sut({ zipCode })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('zipCode'))
  })

  it('should rethrow if SearchAddressByZipCode throws', async () => {
    searchAddressByZipCode.search.mockRejectedValueOnce(error)

    const promise = sut({ zipCode })

    await expect(promise).rejects.toThrow(error)
  })
})
