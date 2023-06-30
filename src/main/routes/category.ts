import { expressRouterAdapter as adapt } from '@/main/adapters'
import { authAdmin, auth } from '@/main/middlewares'
import { makeAddCategoryController, makeDeleteCategoryController, makeListCategoryWithProductController } from '@/main/factories/application/controllers/category'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/category', authAdmin, adapt(makeAddCategoryController()))
  router.get('/categories', auth, adapt(makeListCategoryWithProductController()))
  router.delete('/category/:id', authAdmin, adapt(makeDeleteCategoryController()))
}
