import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'

import { sign, verify } from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return sign({ key }, this.secret, { expiresIn: '2d' })
  }

  async validate ({ token }: TokenValidator.Input): Promise<TokenValidator.Output> {
    const { key } = verify(token, this.secret) as any
    return key
  }
}
