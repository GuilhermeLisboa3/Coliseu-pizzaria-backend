import { accountParams } from '@/tests/mocks'
import { HashComparer, TokenGenerator } from '@/domain/contracts/gateways'
import { LoadAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { AuthenticationError } from '@/domain/error'

import { mock } from 'jest-mock-extended'

describe('Authentication', () => {
  let sut: Authentication

  const { email, password, name, id, error, hashPassword } = accountParams

  const accountRepository = mock<LoadAccountByEmailRepository>()
  const hashComparer = mock<HashComparer>()
  const token = mock<TokenGenerator>()

  beforeAll(() => {
    accountRepository.loadByEmail.mockResolvedValue({ email, password: hashPassword, name, id })
    hashComparer.compare.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = authenticationUseCase(accountRepository, hashComparer, token)
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

  it('should call HashComparer with correct values', async () => {
    await sut({ email, password })

    expect(hashComparer.compare).toHaveBeenCalledWith({ plaintext: password, digest: hashPassword })
    expect(hashComparer.compare).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if HashComparer return false', async () => {
    hashComparer.compare.mockResolvedValueOnce(false)

    const result = sut({ email, password })

    await expect(result).rejects.toThrow(new AuthenticationError())
  })

  it('should rethrow if HashComparer throws', async () => {
    hashComparer.compare.mockRejectedValueOnce(error)

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call TokenGenerator with correct key', async () => {
    await sut({ email, password })

    expect(token.generate).toHaveBeenCalledWith({ key: id })
    expect(token.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if TokenGenerator throws', async () => {
    token.generate.mockRejectedValueOnce(error)

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(error)
  })
})
