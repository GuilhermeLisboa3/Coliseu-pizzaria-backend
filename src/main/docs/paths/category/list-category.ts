export const listCategory = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Category'],
    summary: 'Route to list all categories with products',
    requestBody: { description: 'No body' },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/listCategoryResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
