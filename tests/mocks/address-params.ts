import faker from 'faker'

export const addressParams = {
  id: faker.datatype.uuid(),
  surname: faker.random.word(),
  zipCode: faker.address.zipCode(),
  neighborhood: faker.random.word(),
  street: faker.address.streetName(),
  number: faker.datatype.number(),
  complement: faker.random.word(),
  active: true,
  error: new Error(faker.random.word())
}
