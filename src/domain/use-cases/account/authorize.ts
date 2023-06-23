import { TokenValidator } from '@/domain/contracts/gateways'
import { CheckAccountByRole } from '@/domain/contracts/database/repositories/account'
import { AuthenticationError } from '@/domain/error'

type Setup = (token: TokenValidator, accountRepository: CheckAccountByRole) => Authorize
type Input = { accessToken: string, role?: string }
type Output = void
export type Authorize = (input: Input) => Promise<Output>

export const AuthorizeUseCase: Setup = (token, accountRepository) => async ({ accessToken, role }) => {
  let accountId: string
  try {
    accountId = await token.validate({ token: accessToken })
  } catch (error) { throw new AuthenticationError() }
  await accountRepository.checkByRole({ accountId, role })
}
