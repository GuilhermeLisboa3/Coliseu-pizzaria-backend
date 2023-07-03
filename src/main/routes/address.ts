import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { makeLoadAddressByZipCodeController, makeAddAddressController } from '@/main/factories/application/controllers/address'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/address', auth, adapt(makeLoadAddressByZipCodeController()))
  router.post('/address', auth, adapt(makeAddAddressController()))
}
