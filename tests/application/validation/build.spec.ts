import { RequiredValidation, ValidationBuilder as Builder, EmailValidation, MinSizeValidation } from '@/application/validation'

import faker from 'faker'

describe('ValidationBuilder', () => {
  let value: string
  let fieldName: string

  beforeAll(() => {
    value = faker.database.column()
    fieldName = faker.database.column()
  })

  it('should return a Required validation if required() is call', () => {
    const validators = Builder.of(value, fieldName).required().build()

    expect(validators).toEqual([new RequiredValidation(value, fieldName)])
  })

  it('should return a Email validation if email() is call', () => {
    const validators = Builder.of(value, fieldName).email().build()

    expect(validators).toEqual([new EmailValidation(value, fieldName)])
  })

  it('should return a MinSize validation if min() is call', () => {
    const validators = Builder.of(value, fieldName).min(5).build()

    expect(validators).toEqual([new MinSizeValidation(value, 5)])
  })
})
