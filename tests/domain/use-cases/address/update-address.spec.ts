import { addressParams, accountParams } from '@/tests/mocks'
import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'

describe('updateAddressUseCase', () => {
  let sut: UpdateAddress

  const { id } = addressParams
  const { id: accountId } = accountParams

  const addressRepository = mock<CheckAddressByIdRepository>()

  beforeAll(() => {
    addressRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = updateAddressUseCase(addressRepository)
  })

  it('should call CheckAddressByIdRepository with correct value', async () => {
    await sut({ id, accountId })

    expect(addressRepository.checkById).toHaveBeenCalledWith({ id })
    expect(addressRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if CheckAddressByIdRepository return false', async () => {
    addressRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut({ id, accountId })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('id'))
  })
})
