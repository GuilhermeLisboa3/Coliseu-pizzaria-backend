import { TokenGenerator } from '@/domain/contracts/gateways'

import { sign } from 'jsonwebtoken'

export class JwtAdapter {
  constructor (private readonly secret: string) {}

  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return sign({ key }, this.secret, { expiresIn: '2d' })
  }
}
