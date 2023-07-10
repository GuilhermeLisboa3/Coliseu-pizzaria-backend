import { error } from '@/main/docs/schemas/errors'
import { signup, login } from '@/main/docs/paths/account'
import { signUpRequest, loginRequest, loginResponse } from '@/main/docs/schemas/account'
import { badRequest, serverError, unauthorized } from '@/main/docs/components'

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
    '/signup': signup,
    '/login': login
  },
  schemas: {
    error,
    signUpRequest,
    loginRequest,
    loginResponse
  },
  components: { badRequest, serverError, unauthorized }
}
