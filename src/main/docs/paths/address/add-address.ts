export const addAddress = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Address'],
    summary: 'Route to create a new address',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/addAddressRequest' } } } },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/addAddressResponse' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
