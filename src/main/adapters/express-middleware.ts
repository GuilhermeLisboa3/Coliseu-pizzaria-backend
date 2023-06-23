import { Middleware } from '@/application/middlewares'
import { RequestHandler } from 'express'

type ExpressAdapter = (middleware: Middleware) => RequestHandler

export const expressMiddlewareAdapter: ExpressAdapter = middleware => async (req, res, next) => {
  await middleware.handle({ ...req.headers })
}
