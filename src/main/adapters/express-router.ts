import { Controller } from '@/application/controllers'
import { RequestHandler } from 'express'

type ExpressAdapter = (controller: Controller) => RequestHandler

export const expressRouterAdapter: ExpressAdapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body })
  const json = [201].includes(statusCode) ? data : { error: data.message }
  return res.status(statusCode).json(json)
}
