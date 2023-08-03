export const loadCartWithProducts = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Cart'],
    summary: 'Route to cart with list products',
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/loadCartWithProductsResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
