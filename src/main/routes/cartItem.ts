import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { makeAddCartItemController } from '@/main/factories/application/controllers/cart-item'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/cart-item/:id', auth, adapt(makeAddCartItemController()))
}
