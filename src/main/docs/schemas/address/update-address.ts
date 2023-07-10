export const updateAddressRequest = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    surname: { type: 'string' },
    number: { type: 'number' },
    complement: { type: 'string' },
    active: { type: 'boolean' }
  }
}
