import { accountParams } from '@/tests/mocks'
import { SignUpController } from '@/application/controllers/account'
import { MinSizeValidation, EmailValidation, RequiredValidation } from '@/application/validation'

describe('SignUpController', () => {
  let sut: SignUpController

  const { name, email, password } = accountParams

  beforeEach(() => {
    sut = new SignUpController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ name, email, password })

    expect(validators).toEqual([
      new RequiredValidation(name, 'name'),
      new RequiredValidation(email, 'email'),
      new EmailValidation(email, 'email'),
      new RequiredValidation(password, 'password'),
      new MinSizeValidation(password, 5)
    ])
  })
})
