import { UnauthorizedError } from '@/application/errors'
import { AuthenticationMiddleware } from '@/application/middlewares'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware

  beforeEach(() => {
    sut = new AuthenticationMiddleware()
  })

  it('should return unauthorized if authorization is empty', async () => {
    const { statusCode, data } = await sut.handle({ authorization: '' })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })
})
