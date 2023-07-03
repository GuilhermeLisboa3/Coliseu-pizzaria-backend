import { AddAddressController } from '@/application/controllers/address'
import { Controller } from '@/application/controllers'
import { addressParams } from '@/tests/mocks'
import { RequiredValidation } from '@/application/validation'
import { FieldNotFoundError } from '@/domain/error'

describe('AddAddressController', () => {
  let sut: AddAddressController
  const { neighborhood, complement, number, street, surname, zipCode, id } = addressParams
  const addAddress = jest.fn()

  beforeAll(() => {
    addAddress.mockResolvedValue({ neighborhood, complement, number, street, surname, zipCode, id })
  })

  beforeEach(() => {
    sut = new AddAddressController(addAddress)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ neighborhood, complement, number, street, surname, zipCode, accountId: id })

    expect(validators).toEqual([
      new RequiredValidation(zipCode, 'zipCode'),
      new RequiredValidation(neighborhood, 'neighborhood'),
      new RequiredValidation(number, 'number'),
      new RequiredValidation(street, 'street'),
      new RequiredValidation(surname, 'surname')
    ])
  })

  it('should call addAddress with correct values', async () => {
    await sut.handle({ neighborhood, complement, number, street, surname, zipCode, accountId: id })

    expect(addAddress).toHaveBeenCalledWith({ neighborhood, complement, number, street, surname, zipCode, accountId: id })
    expect(addAddress).toHaveBeenCalledTimes(1)
  })

  it('should return badRequest if addAddress return FieldNotFoundError', async () => {
    addAddress.mockRejectedValueOnce(new FieldNotFoundError('zipCode'))
    const { statusCode, data } = await sut.handle({ neighborhood, complement, number, street, surname, zipCode, accountId: id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('zipCode'))
  })

  it('should return ok on success', async () => {
    const { statusCode, data } = await sut.handle({ neighborhood, complement, number, street, surname, zipCode, accountId: id })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ neighborhood, complement, number, street, surname, zipCode, id })
  })
})
