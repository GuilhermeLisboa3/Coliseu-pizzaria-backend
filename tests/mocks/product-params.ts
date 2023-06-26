import faker from 'faker'

export const productParams = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  error: new Error(faker.random.word())
}
