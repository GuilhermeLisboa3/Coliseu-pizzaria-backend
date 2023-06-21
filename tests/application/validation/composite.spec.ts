import { ValidationComposite, Validator } from '@/application/validation'

import { mock } from 'jest-mock-extended'

import faker from 'faker'

describe('ValidationComposite', () => {
  let sut: ValidationComposite

  let validators: Validator[]
  let firstError: Error
  let secondError: Error

  const validator1 = mock<Validator>()
  const validator2 = mock<Validator>()

  beforeAll(() => {
    firstError = new Error(faker.random.word())
    secondError = new Error(faker.random.word())
    validator1.validate.mockReturnValue(undefined)
    validator2.validate.mockReturnValue(undefined)

    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  it('should return undefined if all Validators return undefined', () => {
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return the first error if any Validator fails', () => {
    validator1.validate.mockReturnValueOnce(firstError)
    validator2.validate.mockReturnValueOnce(secondError)

    const error = sut.validate()

    expect(error).toEqual(firstError)
  })
})
