import { addressParams } from '@/tests/mocks'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { addAddressUseCase, AddAddress } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'

describe('addAddressUseCase', () => {
  let sut: AddAddress

  const { zipCode, neighborhood, street, complement, id, number, surname } = addressParams

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeAll(() => {
    searchAddressByZipCode.search.mockResolvedValue({ neighborhood, street })
  })

  beforeEach(() => {
    sut = addAddressUseCase(searchAddressByZipCode)
  })

  it('should call SearchAddressByZipCode with correct value', async () => {
    await sut({ zipCode, neighborhood, street, number, surname, complement, accountId: id })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if SearchAddressByZipCode return undefined', async () => {
    searchAddressByZipCode.search.mockResolvedValueOnce(undefined)

    const promise = sut({ zipCode, neighborhood, street, number, surname, complement, accountId: id })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('zipCode'))
  })
})
