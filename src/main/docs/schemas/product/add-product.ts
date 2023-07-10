export const addProductRequest = {
  type: 'object',
  properties: {
    categoryId: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    picture: { type: 'string', format: 'binary' }
  },
  required: ['categoryId', 'name', 'description', 'price']
}
