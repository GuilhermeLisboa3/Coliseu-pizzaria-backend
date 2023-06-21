import { accountParams } from '@/tests/mocks'
import { SignUpController } from '@/application/controllers/account'
import { MinSizeValidation, EmailValidation, RequiredValidation } from '@/application/validation'

describe('SignUpController', () => {
  let sut: SignUpController

  const addAccount = jest.fn()

  const { name, email, password } = accountParams

  beforeEach(() => {
    sut = new SignUpController(addAccount)
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

  it('should call addAccount with correct values', async () => {
    await sut.perform({ name, email, password })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })
})
