import { DeleteAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'
import { addressParams } from '@/tests/mocks'
import { FieldNotFoundError } from '@/domain/error'

describe('DeleteAddressController', () => {
  let sut: DeleteAddressController
  const { id } = addressParams
  const deleteAddress = jest.fn()

  beforeEach(() => {
    sut = new DeleteAddressController(deleteAddress)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call deleteAddress with correct values', async () => {
    await sut.handle({ id })

    expect(deleteAddress).toHaveBeenCalledWith({ id })
    expect(deleteAddress).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if deleteAddress return FieldNotFoundError', async () => {
    deleteAddress.mockRejectedValueOnce(new FieldNotFoundError('id'))
    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('id'))
  })
})
