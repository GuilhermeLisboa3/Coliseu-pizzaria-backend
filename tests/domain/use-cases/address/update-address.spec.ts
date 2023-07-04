import { addressParams, accountParams } from '@/tests/mocks'
import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('updateAddressUseCase', () => {
  let sut: UpdateAddress

  const { id } = addressParams
  const { id: accountId } = accountParams

  const addressRepository = mock<CheckAddressByIdRepository>()

  beforeEach(() => {
    sut = updateAddressUseCase(addressRepository)
  })

  it('should call CheckAddressByIdRepository with correct value', async () => {
    await sut({ id, accountId })

    expect(addressRepository.checkById).toHaveBeenCalledWith({ id })
    expect(addressRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
