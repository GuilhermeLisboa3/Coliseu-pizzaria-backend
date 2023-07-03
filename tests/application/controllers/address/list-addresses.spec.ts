import { ListAddressesController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'

describe('ListAddressesController', () => {
  let sut: ListAddressesController

  beforeEach(() => {
    sut = new ListAddressesController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
