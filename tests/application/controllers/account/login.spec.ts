import { LoginController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers'
import { accountParams } from '@/tests/mocks'
import { EmailValidation, MinSizeValidation, RequiredValidation } from '@/application/validation'

describe('LoginController', () => {
  let sut: LoginController
  const { email, password } = accountParams

  beforeEach(() => {
    sut = new LoginController()
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ email, password })

    expect(validators).toEqual([
      new RequiredValidation(email, 'email'),
      new EmailValidation(email, 'email'),
      new RequiredValidation(password, 'password'),
      new MinSizeValidation(password, 5)
    ])
  })
})
