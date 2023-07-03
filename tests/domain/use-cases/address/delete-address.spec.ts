import { addressParams } from '@/tests/mocks'
import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'
import { DeleteAddress, deleteAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('deleteAddressUseCase', () => {
  let sut: DeleteAddress

  const { id } = addressParams

  const addressRepository = mock<CheckAddressByIdRepository >()

  beforeEach(() => {
    sut = deleteAddressUseCase(addressRepository)
  })

  it('should call CheckAddressByIdRepository with correct value', async () => {
    await sut({ id })

    expect(addressRepository.checkById).toHaveBeenCalledWith({ id })
    expect(addressRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
