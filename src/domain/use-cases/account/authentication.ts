import { LoadAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { AuthenticationError } from '@/domain/error'

type Setup = (accountRepository: LoadAccountByEmailRepository) => Authentication
type Input = { email: string, password: string }
type Output = void
export type Authentication = (input: Input) => Promise<Output>

export const authenticationUseCase: Setup = (accountRepository) => async ({ email }) => {
  const account = await accountRepository.loadByEmail({ email })
  if (!account) throw new AuthenticationError()
}
