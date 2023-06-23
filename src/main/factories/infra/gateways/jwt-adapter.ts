import { env } from '@/main/config'
import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'
import { JwtAdapter } from '@/infra/gateways'

export const makeJwtAdapter = (): TokenGenerator & TokenValidator =>
  new JwtAdapter(env.secret)
