import { accountParams } from '@/tests/mocks'
import { LoadAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { Authentication, authenticationUseCase } from '@/domain/use-cases/account'

import { mock } from 'jest-mock-extended'

describe('Authentication', () => {
  let sut: Authentication

  const { email, password } = accountParams

  const accountRepository = mock<LoadAccountByEmailRepository>()

  beforeEach(() => {
    sut = authenticationUseCase(accountRepository)
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    await sut({ email, password })

    expect(accountRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })
})
