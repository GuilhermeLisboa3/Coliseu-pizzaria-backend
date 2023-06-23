import { TokenValidator } from '@/domain/contracts/gateways'
import { CheckAccountByRole } from '@/domain/contracts/database/repositories/account'
import { AuthenticationError, PermissionError } from '@/domain/error'

type Setup = (token: TokenValidator, accountRepository: CheckAccountByRole) => Authorize
type Input = { accessToken: string, role?: string }
type Output = { accountId: string }
export type Authorize = (input: Input) => Promise<Output>

export const AuthorizeUseCase: Setup = (token, accountRepository) => async ({ accessToken, role }) => {
  let accountId: string
  try {
    accountId = await token.validate({ token: accessToken })
  } catch (error) { throw new AuthenticationError() }
  const account = await accountRepository.checkByRole({ accountId, role })
  if (!account) throw new PermissionError()
  return { accountId }
}
