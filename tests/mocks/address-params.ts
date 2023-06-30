import faker from 'faker'

export const addressParams = {
  id: faker.datatype.uuid(),
  surname: faker.random.word(),
  zipCode: faker.address.zipCode(),
  district: faker.random.word(),
  street: faker.address.streetName(),
  number: faker.datatype.number(),
  complement: faker.random.word(),
  active: faker.datatype.boolean(),
  error: new Error(faker.random.word())
}
