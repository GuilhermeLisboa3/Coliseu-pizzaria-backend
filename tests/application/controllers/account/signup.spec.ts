import { accountParams } from '@/tests/mocks'
import { SignUpController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers'
import { MinSizeValidation, EmailValidation, RequiredValidation } from '@/application/validation'
import { FieldInUseError } from '@/domain/error'

describe('SignUpController', () => {
  let sut: SignUpController

  const addAccount = jest.fn()

  const { name, email, password } = accountParams

  beforeEach(() => {
    sut = new SignUpController(addAccount)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
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
    await sut.handle({ name, email, password })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if addAccount return FieldInUseError', async () => {
    addAccount.mockRejectedValueOnce(new FieldInUseError('name'))
    const { statusCode, data } = await sut.handle({ name, email, password })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldInUseError('name'))
  })

  it('should return created on success', async () => {
    const { statusCode } = await sut.handle({ name, email, password })

    expect(statusCode).toBe(201)
  })
})
