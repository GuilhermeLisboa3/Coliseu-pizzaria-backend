import { v4 } from 'uuid'

export class UUIDAdapter {
  async generate (): Promise<void> {
    v4()
  }
}
