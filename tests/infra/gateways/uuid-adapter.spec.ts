import { UUIDAdapter } from '@/infra/gateways'

import { v4 } from 'uuid'
import faker from 'faker'

jest.mock('uuid')

describe('UUIDAdapter', () => {
  let sut: UUIDAdapter
  const key = faker.random.word()

  beforeAll(() => {
    jest.mocked(v4).mockReturnValue(key)
  })

  beforeEach(() => {
    sut = new UUIDAdapter()
  })

  it('should call v4', async () => {
    sut.generate()

    expect(v4).toHaveBeenCalled()
    expect(v4).toHaveBeenCalledTimes(1)
  })

  it('should return a key on success', async () => {
    const result = sut.generate()

    expect(result).toBe(key)
  })
})
