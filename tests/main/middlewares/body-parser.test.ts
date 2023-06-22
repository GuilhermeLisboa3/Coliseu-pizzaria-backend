import { app } from '@/main/config'

import request from 'supertest'
import faker from 'faker'

describe('BodyParser Middleware', () => {
  let email: string

  beforeEach(() => {
    email = faker.internet.email()
  })

  it('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => { res.send(req.body) })

    await request(app).post('/test_body_parser').send({ email }).expect({ email })
  })
})
