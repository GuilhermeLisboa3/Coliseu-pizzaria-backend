export const listAddressesResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      surname: { type: 'string' },
      zipCode: { type: 'string' },
      neighborhood: { type: 'string' },
      street: { type: 'string' },
      number: { type: 'number' },
      complement: { type: 'string' },
      active: { type: 'boolean' }
    }
  }
}
