import { HashGenerator } from '@/domain/contracts/gateways'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashGenerator {
  async generate ({ plaintext }: HashGenerator.Input): Promise<HashGenerator.Output> {
    return bcrypt.hash(plaintext, 12)
  }
}
