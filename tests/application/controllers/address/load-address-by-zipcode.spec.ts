import { LoadAddressByZipCodeController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'

describe('LoadAddressByZipCodeController', () => {
  let sut: LoadAddressByZipCodeController

  beforeEach(() => {
    sut = new LoadAddressByZipCodeController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
