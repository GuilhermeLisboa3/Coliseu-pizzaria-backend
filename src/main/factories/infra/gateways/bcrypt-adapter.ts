import { HashGenerator } from '@/domain/contracts/gateways'
import { BcryptAdapter } from '@/infra/gateways'

export const makeHashAdapter = (): HashGenerator =>
  new BcryptAdapter()
