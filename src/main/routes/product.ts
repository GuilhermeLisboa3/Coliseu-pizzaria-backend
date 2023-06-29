import { expressRouterAdapter as adapt, multerAdapter } from '@/main/adapters'
import { authAdmin } from '@/main/middlewares'
import { makeAddProductController, makeUpdateProductController } from '@/main/factories/application/controllers/product'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/product', authAdmin, multerAdapter, adapt(makeAddProductController()))
  router.put('/product/:id', authAdmin, multerAdapter, adapt(makeUpdateProductController()))
}
