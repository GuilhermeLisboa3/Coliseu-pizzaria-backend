export const loadCartWithProductsResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    accountId: { type: 'string' },
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'string' },
          available: { type: 'string' },
          picture: { type: 'string' },
          categoryId: { type: 'string' },
          categoryName: { type: 'string' },
          quantity: { type: 'number' }
        }
      }
    }
  }
}
