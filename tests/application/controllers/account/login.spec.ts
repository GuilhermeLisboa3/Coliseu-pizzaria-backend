import { LoginController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers'
import { accountParams } from '@/tests/mocks'
import { EmailValidation, MinSizeValidation, RequiredValidation } from '@/application/validation'
import { AuthenticationError } from '@/domain/error'
import { UnauthorizedError } from '@/application/errors'

describe('LoginController', () => {
  let sut: LoginController
  const { email, password } = accountParams
  const authentication = jest.fn()

  beforeEach(() => {
    sut = new LoginController(authentication)
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

  it('should call authentication with correct values', async () => {
    await sut.handle({ email, password })

    expect(authentication).toHaveBeenCalledWith({ email, password })
    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if addAccount return FieldInUseError', async () => {
    authentication.mockRejectedValueOnce(new AuthenticationError())
    const { statusCode, data } = await sut.handle({ email, password })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })
})
