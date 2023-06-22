import { accountParams } from '@/tests/mocks'
import { LoadAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { AuthenticationError } from '@/domain/error'

import { mock } from 'jest-mock-extended'

describe('Authentication', () => {
  let sut: Authentication

  const { email, password, name, id, error } = accountParams

  const accountRepository = mock<LoadAccountByEmailRepository>()

  beforeAll(() => {
    accountRepository.loadByEmail.mockResolvedValue({ email, password, name, id })
  })

  beforeEach(() => {
    sut = authenticationUseCase(accountRepository)
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    await sut({ email, password })

    expect(accountRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if LoadAccountByEmailRepository return null', async () => {
    accountRepository.loadByEmail.mockResolvedValueOnce(null)

    const result = sut({ email, password })

    await expect(result).rejects.toThrow(new AuthenticationError())
  })

  it('should rethrow if LoadAccountByEmailRepository throws', async () => {
    accountRepository.loadByEmail.mockRejectedValueOnce(error)

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(error)
  })
})
