import { ListAddressesController } from '@/application/controllers/address'
import { accountParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'

describe('ListAddressesController', () => {
  const { id: accountId } = accountParams
  const listAddresses = jest.fn()
  let sut: ListAddressesController

  beforeEach(() => {
    sut = new ListAddressesController(listAddresses)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call listAddresses with correct values', async () => {
    await sut.handle({ accountId })

    expect(listAddresses).toHaveBeenCalledWith({ accountId })
    expect(listAddresses).toHaveBeenCalledTimes(1)
  })
})
