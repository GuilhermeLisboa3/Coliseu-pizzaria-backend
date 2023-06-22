import { LoginController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers'

describe('LoginController', () => {
  let sut: LoginController

  beforeEach(() => {
    sut = new LoginController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
