import faker from 'faker'

const password = faker.internet.password(8)

export const accountParams = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password,
  hashPassword: faker.internet.password(8),
  error: new Error(faker.random.word())
}
