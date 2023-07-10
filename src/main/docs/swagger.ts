import { error } from '@/main/docs/schemas/errors'
import { signup, login } from '@/main/docs/paths/account'
import { signUpRequest, loginRequest, loginResponse } from '@/main/docs/schemas/account'
import { addCategory, listCategory, deleteCategory } from '@/main/docs/paths/category'
import { addCategoryRequest, listCategoryResponse } from '@/main/docs/schemas/category'
import { addProduct, updateProduct } from '@/main/docs/paths/product'
import { productSchema, addProductRequest, updateProductRequest } from '@/main/docs/schemas/product'
import { badRequest, serverError, unauthorized, forbidden, securitySchemes } from '@/main/docs/components'

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
  tags: [{ name: 'Account' }, { name: 'Category' }, { name: 'Product' }],
  paths: {
    '/signup': signup,
    '/login': login,
    '/category': addCategory,
    '/categories': listCategory,
    '/category/{id}': deleteCategory,
    '/product': addProduct,
    '/product/{id}': updateProduct
  },
  schemas: {
    error,
    signUpRequest,
    loginRequest,
    loginResponse,
    addCategoryRequest,
    productSchema,
    listCategoryResponse,
    addProductRequest,
    updateProductRequest
  },
  components: { securitySchemes, forbidden, badRequest, serverError, unauthorized }
}
