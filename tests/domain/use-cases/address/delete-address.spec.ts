import { addressParams } from '@/tests/mocks'
import { CheckAddressByIdRepository, DeleteAddressRepository } from '@/domain/contracts/database/repositories/address'
import { DeleteAddress, deleteAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'

describe('deleteAddressUseCase', () => {
  let sut: DeleteAddress

  const { id, error } = addressParams

  const addressRepository = mock<CheckAddressByIdRepository & DeleteAddressRepository>()

  beforeAll(() => {
    addressRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = deleteAddressUseCase(addressRepository)
  })

  it('should call CheckAddressByIdRepository with correct value', async () => {
    await sut({ id })

    expect(addressRepository.checkById).toHaveBeenCalledWith({ id })
    expect(addressRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if CheckAddressByIdRepository return false', async () => {
    addressRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('id'))
  })

  it('should rethrow if CheckAddressByIdRepository throws', async () => {
    addressRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call DeleteAddressRepository with correct value', async () => {
    await sut({ id })

    expect(addressRepository.delete).toHaveBeenCalledWith({ id })
    expect(addressRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if DeleteAddressRepository throws', async () => {
    addressRepository.delete.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })
})
