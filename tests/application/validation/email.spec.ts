import { InvalidFieldError } from '@/application/errors'
import { EmailValidation } from '@/application/validation'

import faker from 'faker'

describe('EmailValidation', () => {
  let validEmail: string
  let invalidEmail: string
  let fieldName: string

  beforeAll(() => {
    validEmail = faker.internet.email()
    invalidEmail = faker.random.word()
    fieldName = faker.database.column()
  })

  it('should return InvalidFieldError if email is invalid', () => {
    const sut = new EmailValidation(invalidEmail, fieldName)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  it('should return undefined if email is empty', () => {
    const sut = new EmailValidation(undefined as any, fieldName)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if email is valid', () => {
    const sut = new EmailValidation(validEmail, fieldName)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
