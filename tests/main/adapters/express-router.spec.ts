import { expressRouterAdapter } from '@/main/adapters'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { Controller } from '@/application/controllers'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('Express Router Adapter', () => {
  let sut: RequestHandler
  let req: Request
  let res: Response
  let next: NextFunction

  let key: string
  let value: string

  const controller = mock<Controller>()

  beforeAll(() => {
    key = faker.random.word()
    value = faker.random.words(6)
  })

  beforeEach(() => {
    sut = expressRouterAdapter(controller)
    req = getMockReq({ body: { [key]: value } })
    res = getMockRes().res
    next = getMockRes().next
  })
  it('should call handler if correct value', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ [key]: value })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handler with empty request', async () => {
    req = getMockReq()
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })
})
