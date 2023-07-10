export const updateAddress = {
  put: {
    security: [{ bearerAuth: [] }],
    tags: ['Address'],
    summary: 'Route to update address info',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/updateAddressRequest' } } } },
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
