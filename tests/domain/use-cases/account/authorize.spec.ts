import { accountParams } from '@/tests/mocks'
import { Authorize, AuthorizeUseCase } from '@/domain/use-cases/account'
import { TokenValidator } from '@/domain/contracts/gateways'
import { CheckAccountByRole } from '@/domain/contracts/database/repositories/account'
import { AuthenticationError } from '@/domain/error'

import { mock } from 'jest-mock-extended'

describe('AuthorizeUseCase', () => {
  let sut: Authorize

  const role = 'admin'
  const token = mock<TokenValidator>()
  const accountRepository = mock<CheckAccountByRole>()
  const { accessToken, error, id } = accountParams

  beforeAll(() => {
    token.validate.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = AuthorizeUseCase(token, accountRepository)
  })

  it('should call TokenValidator with correct value', async () => {
    await sut({ accessToken, role })

    expect(token.validate).toHaveBeenCalledWith({ token: accessToken })
    expect(token.validate).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if TokenValidator throws', async () => {
    token.validate.mockRejectedValueOnce(error)
    const promise = sut({ accessToken, role })

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })

  it('should call CheckAccountByRole with correct values', async () => {
    await sut({ accessToken, role })

    expect(accountRepository.checkByRole).toHaveBeenCalledWith({ accountId: id, role })
    expect(accountRepository.checkByRole).toHaveBeenCalledTimes(1)
  })
})
