import { accountParams } from '@/tests/mocks'
import { UnauthorizedError } from '@/application/errors'
import { AuthenticationMiddleware } from '@/application/middlewares'
import { AuthenticationError } from '@/domain/error'

describe('AuthenticationMiddleware', () => {
  const { accessToken, id } = accountParams
  const role = 'user'
  const authorization = `Bearer ${accessToken}`
  const authorize = jest.fn()
  let sut: AuthenticationMiddleware

  beforeAll(() => {
    authorize.mockResolvedValue({ accountId: id })
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize, role)
  })

  it('should return unauthorized if authorization is empty', async () => {
    const { statusCode, data } = await sut.handle({ authorization: '' })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('should return unauthorized if authorization is undefined', async () => {
    const { statusCode, data } = await sut.handle({ authorization: undefined as any })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('should return unauthorized if authorization is null', async () => {
    const { statusCode, data } = await sut.handle({ authorization: null as any })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('should call authorize with correct values', async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ accessToken, role })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return unauthorized if authorize return AuthenticationError', async () => {
    authorize.mockRejectedValueOnce(new AuthenticationError())

    const { statusCode, data } = await sut.handle({ authorization })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })
})
