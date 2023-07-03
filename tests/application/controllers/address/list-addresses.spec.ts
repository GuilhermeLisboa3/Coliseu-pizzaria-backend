import { ListAddressesController } from '@/application/controllers/address'
import { accountParams, addressParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'

describe('ListAddressesController', () => {
  const { id: accountId } = accountParams
  const { active, complement, id, neighborhood, number, street, surname, zipCode } = addressParams
  const listAddresses = jest.fn()
  let sut: ListAddressesController

  beforeAll(() => {
    listAddresses.mockResolvedValue([{ active, complement, id, neighborhood, number, street, surname, zipCode }])
  })

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

  it('should return ok on success', async () => {
    const { statusCode, data } = await sut.handle({ accountId })

    expect(statusCode).toBe(200)
    expect(data).toEqual([{ active, complement, id, neighborhood, number, street, surname, zipCode }])
  })
})
