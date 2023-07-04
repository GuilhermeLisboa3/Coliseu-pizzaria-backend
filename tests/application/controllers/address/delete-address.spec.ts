import { DeleteAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'
import { addressParams } from '@/tests/mocks'

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
})
