import { Middleware } from '@/application/middlewares'
import { RequestHandler } from 'express'

type ExpressAdapter = (middleware: Middleware) => RequestHandler

export const expressMiddlewareAdapter: ExpressAdapter = middleware => async (req, res, next) => {
  const { statusCode, data } = await middleware.handle({ ...req.headers })
  if (statusCode === 200) {
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}
