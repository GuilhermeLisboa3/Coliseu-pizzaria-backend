import { UpdateAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'
import { addressParams } from '@/tests/mocks'
import { RequiredValidation } from '@/application/validation'
import { FieldNotFoundError } from '@/domain/error'

describe('UpdateAddressController', () => {
  let sut: UpdateAddressController
  const { id, complement } = addressParams
  const updateAddress = jest.fn()

  beforeEach(() => {
    sut = new UpdateAddressController(updateAddress)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ id, complement, accountId: id })

    expect(validators).toEqual([
      new RequiredValidation(id, 'id')
    ])
  })

  it('should call addAddress with correct values', async () => {
    await sut.handle({ id, complement, accountId: id })

    expect(updateAddress).toHaveBeenCalledWith({ id, complement, accountId: id })
    expect(updateAddress).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if deleteAddress return FieldNotFoundError', async () => {
    updateAddress.mockRejectedValueOnce(new FieldNotFoundError('id'))
    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('id'))
  })
})
