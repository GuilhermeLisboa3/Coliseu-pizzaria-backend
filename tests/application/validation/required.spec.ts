import { RequiredFieldError } from '@/application/errors'
import { RequiredValidation } from '@/application/validation'

import faker from 'faker'

describe('RequiredValidation', () => {
  let value: string
  let fieldName: string

  beforeAll(() => {
    value = faker.random.words(5)
    fieldName = faker.database.column()
  })

  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredValidation('', fieldName)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError(fieldName))
  })

  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiredValidation(null as any, fieldName)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError(fieldName))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredValidation(undefined as any, fieldName)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError(fieldName))
  })

  it('should return undefined if value is not falsy', () => {
    const sut = new RequiredValidation(value, fieldName)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
