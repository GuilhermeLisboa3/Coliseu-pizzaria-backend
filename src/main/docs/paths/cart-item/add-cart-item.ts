export const addCartItem = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Cart-Item'],
    summary: 'Route to create a cart item',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/cartItemSchema' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
