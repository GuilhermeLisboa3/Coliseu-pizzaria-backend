import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { makeLoadCartWithProductsController } from '@/main/factories/application/controllers/cart'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/cart', auth, adapt(makeLoadCartWithProductsController()))
}
