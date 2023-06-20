import { accountParams } from '@/tests/mocks'
import { CheckAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { FieldInUseError } from '@/domain/error'

import { mock } from 'jest-mock-extended'

describe('AddAccount', () => {
  let sut: AddAccount

  const { name, email, password, error } = accountParams

  const accountRepository = mock<CheckAccountByEmailRepository>()

  beforeAll(() => {
    accountRepository.checkByEmail.mockResolvedValue(false)
  })

  beforeEach(() => {
    sut = addAccountUseCase(accountRepository)
  })

  it('should call CheckAccountByEmailRepository with correct email', async () => {
    await sut({ name, email, password })

    expect(accountRepository.checkByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckAccountByEmailRepository return true', async () => {
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new FieldInUseError('email'))
  })

  it('should rethrow if CheckAccountByEmailRepository throws', async () => {
    accountRepository.checkByEmail.mockRejectedValueOnce(error)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(error)
  })
})
