import { cors } from '@/main/middlewares'

import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors)
}
