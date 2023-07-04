import { DeleteAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'

describe('DeleteAddressController', () => {
  let sut: DeleteAddressController

  beforeEach(() => {
    sut = new DeleteAddressController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
