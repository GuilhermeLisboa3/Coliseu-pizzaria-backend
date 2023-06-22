import { HashComparer, HashGenerator } from '@/domain/contracts/gateways'
import { BcryptAdapter } from '@/infra/gateways'

export const makeHashAdapter = (): HashGenerator & HashComparer =>
  new BcryptAdapter()
