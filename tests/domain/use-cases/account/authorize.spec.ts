import { accountParams } from '@/tests/mocks'
import { Authorize, AuthorizeUseCase } from '@/domain/use-cases/account'
import { TokenValidator } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/error'

import { mock } from 'jest-mock-extended'

describe('AuthorizeUseCase', () => {
  let sut: Authorize

  const token = mock<TokenValidator>()
  const { accessToken, error } = accountParams

  beforeEach(() => {
    sut = AuthorizeUseCase(token)
  })

  it('should call TokenValidator with correct value', async () => {
    await sut({ accessToken })

    expect(token.validate).toHaveBeenCalledWith({ token: accessToken })
    expect(token.validate).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if TokenValidator throws', async () => {
    token.validate.mockRejectedValueOnce(error)
    const promise = sut({ accessToken })

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })
})
