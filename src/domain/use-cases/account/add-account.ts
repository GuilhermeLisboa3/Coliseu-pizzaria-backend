import { CheckAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/error'

type Setup = (accountRepository: CheckAccountByEmailRepository, hash: HashGenerator) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = void
export type AddAccount = (input: Input) => Promise<Output>

export const addAccountUseCase: Setup = (accountRepository, hash) => async ({ name, email, password }) => {
  const emailExists = await accountRepository.checkByEmail({ email })
  if (emailExists) throw new FieldInUseError('email')
  await hash.generate({ plaintext: password })
}
