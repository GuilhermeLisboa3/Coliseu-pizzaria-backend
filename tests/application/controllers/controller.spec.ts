import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { ValidationComposite } from '@/application/validation'
import { ServerError } from '@/application/errors'

import faker from 'faker'

jest.mock('@/application/validation/composite')

class ControllerStub extends Controller {
  result: HttpResponse = { statusCode: 200, data: faker.random.objectElement() }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  let value: any
  let errorObject: Error

  beforeAll(() => {
    value = faker.random.word()
    errorObject = new Error(faker.random.word())
  })

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('should return badRequest if any validation fails', async () => {
    jest.mocked(ValidationComposite).mockImplementationOnce(
      jest.fn().mockImplementationOnce(() => ({ validate: jest.fn().mockReturnValueOnce(errorObject) }))
    )

    const { statusCode, data } = await sut.handle(value)

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(statusCode).toBe(400)
    expect(data).toEqual(errorObject)
  })

  it('should return serverError if perform throw', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(errorObject)

    const { statusCode, data } = await sut.handle(value)

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(errorObject))
  })
})
