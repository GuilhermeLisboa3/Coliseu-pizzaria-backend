import { error } from '@/main/docs/schemas/errors'
import { signup, login } from '@/main/docs/paths/account'
import { signUpRequest, loginRequest, loginResponse } from '@/main/docs/schemas/account'
import { addCategory, listCategory, deleteCategory } from '@/main/docs/paths/category'
import { addCategoryRequest, listCategoryResponse } from '@/main/docs/schemas/category'
import { addProduct, updateProduct, deleteProduct } from '@/main/docs/paths/product'
import { productSchema, addProductRequest, updateProductRequest } from '@/main/docs/schemas/product'
import { loadAddressByZipCode, addAddress, updateAddress, listAddresses, deleteAddress } from '@/main/docs/paths/address'
import { loadAddressByZipCodeResponse, addAddressRequest, addAddressResponse, updateAddressRequest, listAddressesResponse } from '@/main/docs/schemas/address'
import { addCartItem, deleteCartItem } from '@/main/docs/paths/cart-item'
import { cartItemSchema } from '@/main/docs/schemas/cart-item'
import { loadCartWithProducts } from '@/main/docs/paths/cart'
import { loadCartWithProductsResponse } from '@/main/docs/schemas/cart'
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
  tags: [{ name: 'Account' }, { name: 'Category' }, { name: 'Product' }, { name: 'Address' }, { name: 'Cart-Item' }, { name: 'Cart' }],
  paths: {
    '/signup': signup,
    '/login': login,
    '/category': addCategory,
    '/categories': listCategory,
    '/category/{id}': deleteCategory,
    '/product': addProduct,
    '/product/{id}': updateProduct,
    '/product/{id}/': deleteProduct,
    '/address/{zipCode}': loadAddressByZipCode,
    '/address': addAddress,
    '/address/': updateAddress,
    '/addresses': listAddresses,
    '/address/{id}': deleteAddress,
    '/cart-item/{id}': addCartItem,
    '/cart-item/{id}/': deleteCartItem,
    '/cart': loadCartWithProducts
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
    updateProductRequest,
    loadAddressByZipCodeResponse,
    addAddressRequest,
    addAddressResponse,
    updateAddressRequest,
    listAddressesResponse,
    cartItemSchema,
    loadCartWithProductsResponse
  },
  components: { securitySchemes, forbidden, badRequest, serverError, unauthorized }
}
