import { expressMiddlewareAdapter } from '@/main/adapters'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'

import { mock } from 'jest-mock-extended'
import faker from 'faker'
import { Middleware } from '@/application/middlewares'

describe('Express Middleware Adapter', () => {
  let sut: RequestHandler
  let req: Request
  let res: Response
  let next: NextFunction

  let key: string
  let value: string

  const middleware = mock<Middleware>()

  beforeAll(() => {
    key = faker.random.word()
    value = faker.random.words(6)
  })

  beforeEach(() => {
    sut = expressMiddlewareAdapter(middleware)
    req = getMockReq({ headers: { [key]: value } })
    res = getMockRes().res
    next = getMockRes().next
  })
  it('should call handle if correct value', async () => {
    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({ [key]: value })
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })
})
