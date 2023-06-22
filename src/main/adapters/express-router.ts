import { Controller } from '@/application/controllers'
import { RequestHandler } from 'express'

type ExpressAdapter = (controller: Controller) => RequestHandler

export const expressRouterAdapter: ExpressAdapter = controller => async (req, res) => {
  await controller.handle({ ...req.body })
}
