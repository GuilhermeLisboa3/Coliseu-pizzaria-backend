export const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'string' },
    available: { type: 'string' },
    picture: { type: 'string' },
    categoryId: { type: 'string' }
  }
}
