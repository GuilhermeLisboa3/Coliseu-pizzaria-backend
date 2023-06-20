import { accountParams } from '@/tests/mocks'
import { CheckAccountByEmailRepository, AddAccountRepository } from '@/domain/contracts/database/repositories/account'
import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/error'

import { mock } from 'jest-mock-extended'

describe('AddAccount', () => {
  let sut: AddAccount

  const { name, email, password, error, hashPassword } = accountParams

  const accountRepository = mock<CheckAccountByEmailRepository & AddAccountRepository>()
  const hash = mock<HashGenerator>()

  beforeAll(() => {
    accountRepository.checkByEmail.mockResolvedValue(false)
    hash.generate.mockResolvedValue(hashPassword)
  })

  beforeEach(() => {
    sut = addAccountUseCase(accountRepository, hash)
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

  it('should call HashGenerator with correct plaintext', async () => {
    await sut({ name, email, password })

    expect(hash.generate).toHaveBeenCalledWith({ plaintext: password })
    expect(hash.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if HashGenerator throws', async () => {
    hash.generate.mockRejectedValueOnce(error)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call AddAccountRepository with correct values', async () => {
    await sut({ name, email, password })

    expect(accountRepository.create).toHaveBeenCalledWith({ name, email, password: hashPassword })
    expect(accountRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if AddAccountRepository throws', async () => {
    accountRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('should return undefined on success', async () => {
    const result = await sut({ name, email, password })

    expect(result).toBeUndefined()
  })
})
