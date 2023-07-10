export const signup = {
  post: {
    tags: ['Account'],
    summary: 'Route to create a new account',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/signUpRequest' } } } },
    responses: {
      201: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
