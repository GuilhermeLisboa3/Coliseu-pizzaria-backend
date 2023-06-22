import { env } from '@/main/config'
import { TokenGenerator } from '@/domain/contracts/gateways'
import { JwtAdapter } from '@/infra/gateways'

export const makeJwtAdapter = (): TokenGenerator =>
  new JwtAdapter(env.secret)
