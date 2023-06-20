import { accountParams } from '@/tests/mocks'
import { CheckAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'

import { mock } from 'jest-mock-extended'

describe('AddAccount', () => {
  let sut: AddAccount

  const { name, email, password } = accountParams

  const accountRepository = mock<CheckAccountByEmailRepository>()

  beforeEach(() => {
    sut = addAccountUseCase(accountRepository)
  })

  it('should call CheckAccountByEmailRepository with correct email', async () => {
    await sut({ name, email, password })

    expect(accountRepository.checkByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })
})
