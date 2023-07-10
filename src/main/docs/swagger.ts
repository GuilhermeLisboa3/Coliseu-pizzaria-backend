import { error } from '@/main/docs/schemas/errors'
import { signup } from '@/main/docs/paths/account'
import { signUpRequest } from '@/main/docs/schemas/account'
import { badRequest, serverError } from '@/main/docs/components'

export const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Fast food',
    description: 'API created for the Fast food application',
    version: '1.0.0',
    contact: {
      name: 'Guilherme Gonçalves Lisboa',
      url: 'https://www.linkedin.com/in/guilhermegon%C3%A7alveslisboa/'
    }
  },
  servers: [{ url: '/' }],
  tags: [{ name: 'Account' }],
  paths: {
    '/signup': signup
  },
  schemas: {
    error,
    signUpRequest
  },
  components: { badRequest, serverError }
}
