import { UUIDAdapter } from '@/infra/gateways'

import { v4 } from 'uuid'

jest.mock('uuid')

describe('UUIDAdapter', () => {
  let sut: UUIDAdapter

  beforeEach(() => {
    sut = new UUIDAdapter()
  })

  it('should call v4', async () => {
    await sut.generate()

    expect(v4).toHaveBeenCalled()
    expect(v4).toHaveBeenCalledTimes(1)
  })
})
