export const cartItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    cartId: { type: 'string' },
    productId: { type: 'string' },
    quantity: { type: 'string' }
  }
}
