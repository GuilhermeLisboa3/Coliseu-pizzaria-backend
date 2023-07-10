import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import {
  makeLoadAddressByZipCodeController,
  makeAddAddressController,
  makeListAddressesController,
  makeDeleteAddressController,
  makeUpdateAddressController
} from '@/main/factories/application/controllers/address'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/address', auth, adapt(makeAddAddressController()))
  router.put('/address', auth, adapt(makeUpdateAddressController()))
  router.get('/addresses', auth, adapt(makeListAddressesController()))
  router.get('/address/:zipCode', auth, adapt(makeLoadAddressByZipCodeController()))
  router.delete('/address/:id', auth, adapt(makeDeleteAddressController()))
}
