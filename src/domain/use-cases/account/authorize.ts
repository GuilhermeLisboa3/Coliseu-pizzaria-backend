import { TokenValidator } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/error'

type Setup = (token: TokenValidator) => Authorize
type Input = { accessToken: string }
type Output = void
export type Authorize = (input: Input) => Promise<Output>

export const AuthorizeUseCase: Setup = (token) => async ({ accessToken }) => {
  try {
    await token.validate({ token: accessToken })
  } catch (error) { throw new AuthenticationError() }
}
