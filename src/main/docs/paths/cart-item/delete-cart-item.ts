export const deleteCartItem = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['Cart-Item'],
    summary: 'Route to delete a cart item',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
