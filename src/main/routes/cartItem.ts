import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { makeAddCartItemController, makeDeleteCartItemController } from '@/main/factories/application/controllers/cart-item'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/cart-item/:id', auth, adapt(makeAddCartItemController()))
  router.delete('/cart-item/:id', auth, adapt(makeDeleteCartItemController()))
}
