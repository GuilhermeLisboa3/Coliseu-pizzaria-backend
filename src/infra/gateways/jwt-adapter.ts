import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'

import { sign, verify } from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return sign({ key }, this.secret, { expiresIn: '2d' })
  }

  async validate ({ token }: TokenValidator.Input): Promise<void> {
    verify(token, this.secret)
  }
}
