import { addressParams } from '@/tests/mocks'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { addAddressUseCase, AddAddress } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('addAddressUseCase', () => {
  let sut: AddAddress

  const { zipCode, neighborhood, street, complement, id, number, surname } = addressParams

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeEach(() => {
    sut = addAddressUseCase(searchAddressByZipCode)
  })

  it('should call SearchAddressByZipCode with correct value', async () => {
    await sut({ zipCode, neighborhood, street, number, surname, complement, accountId: id })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })
})
