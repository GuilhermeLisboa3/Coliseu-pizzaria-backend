export const addProduct = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Product'],
    summary: 'Route to create a new product',
    requestBody: { content: { 'multipart/form-data': { schema: { $ref: '#/schemas/addProductRequest' } } } },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/productSchema' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
