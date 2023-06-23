import { TokenValidator } from '@/domain/contracts/gateways'

type Setup = (token: TokenValidator) => Authorize
type Input = { accessToken: string }
type Output = void
export type Authorize = (input: Input) => Promise<Output>

export const AuthorizeUseCase: Setup = (token) => async ({ accessToken }) => {
  await token.validate({ token: accessToken })
}
