import { addressParams, accountParams } from '@/tests/mocks'
import { CheckAddressByIdRepository, ListAddressRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'

describe('updateAddressUseCase', () => {
  let sut: UpdateAddress

  const { id, error, complement, neighborhood, number, street, surname, zipCode, active } = addressParams
  const { id: accountId } = accountParams

  const addressRepository = mock<CheckAddressByIdRepository & ListAddressRepository & UpdateAddressRepository>()

  beforeAll(() => {
    addressRepository.checkById.mockResolvedValue(true)
    addressRepository.list.mockResolvedValue([{ id, complement, neighborhood, number, street, surname, zipCode, accountId, active }])
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

  it('should rethrow if CheckAddressByIdRepository throws', async () => {
    addressRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ id, accountId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call ListAddressRepository if active exists', async () => {
    await sut({ id, accountId, active })

    expect(addressRepository.list).toHaveBeenCalledWith({ accountId })
    expect(addressRepository.list).toHaveBeenCalledTimes(1)
  })

  it('should call UpdateAddressRepository if ListAddressRepository return andresses', async () => {
    await sut({ id, accountId, active })

    expect(addressRepository.update).toHaveBeenCalledWith({ id, active: false })
    expect(addressRepository.update).toHaveBeenCalledTimes(2)
  })

  it('should call UpdateAddressRepository with correct values', async () => {
    await sut({ id, accountId, complement, number, surname })

    expect(addressRepository.update).toHaveBeenCalledWith({ id, complement, number, surname, active: undefined })
    expect(addressRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UpdateAddressRepository throws', async () => {
    addressRepository.update.mockRejectedValueOnce(error)

    const promise = sut({ id, accountId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should return undefined on success', async () => {
    const result = await sut({ id, accountId, complement, number, surname })

    expect(result).toBeUndefined()
  })
})
