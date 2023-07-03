import { AddAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'

describe('AddAddressController', () => {
  let sut: AddAddressController

  beforeEach(() => {
    sut = new AddAddressController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
