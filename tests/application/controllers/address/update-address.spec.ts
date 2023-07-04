import { UpdateAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'

describe('UpdateAddressController', () => {
  let sut: UpdateAddressController

  beforeEach(() => {
    sut = new UpdateAddressController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
