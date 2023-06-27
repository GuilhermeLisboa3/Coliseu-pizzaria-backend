import { multerAdapter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import multer from 'multer'
import faker from 'faker'

jest.mock('multer')

describe('MulterAdapter', () => {
  let sut: RequestHandler

  let key: string
  let value: string
  let req: Request
  let res: Response
  let next: NextFunction

  const fakeMulter = multer as jest.Mocked<typeof multer>

  const uploadSpy: jest.Mock = jest.fn()
  const singleSpy: jest.Mock = jest.fn()
  const multerSpy: jest.Mock = jest.fn()

  beforeAll(() => {
    key = faker.database.column()
    value = faker.random.words()

    uploadSpy.mockImplementation((req, res, next) => {
      req.file = { buffer: Buffer.from(key), mimetype: value }

      next()
    })
    singleSpy.mockImplementation(() => uploadSpy)
    multerSpy.mockImplementation(() => ({ single: singleSpy }))
    jest.mocked(fakeMulter).mockImplementation(multerSpy)
  })

  beforeEach(() => {
    sut = multerAdapter

    req = getMockReq({ locals: { [key]: value } })
    res = getMockRes().res
    next = getMockRes().next
  })

  it('should call single upload with correct values', () => {
    sut(req, res, next)

    expect(multerSpy).toHaveBeenCalledWith()
    expect(multerSpy).toHaveBeenCalledTimes(1)
    expect(singleSpy).toHaveBeenCalledWith('picture')
    expect(singleSpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith(req, res, expect.any(Function))
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })
})
