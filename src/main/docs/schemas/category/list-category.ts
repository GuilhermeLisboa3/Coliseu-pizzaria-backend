export const listCategoryResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      products: {
        type: 'array',
        items: {
          $ref: '#/schemas/productSchema'
        }
      }
    }
  }
}
