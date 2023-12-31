import faker from 'faker'

export const categoryParams = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  error: new Error(faker.random.word())
}
