import { UUIDGenerator } from '@/domain/contracts/gateways'
import { v4 } from 'uuid'

export class UUIDAdapter implements UUIDGenerator {
  generate (): UUIDGenerator.Output {
    return v4()
  }
}
