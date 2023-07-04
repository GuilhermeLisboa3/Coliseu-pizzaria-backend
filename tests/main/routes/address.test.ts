import { env } from '@/main/config'
import { accountParams, addressParams } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { prisma } from '@/infra/database/postgres/helpers'
import { ZipCodeApi } from '@/infra/gateways'

import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { FieldNotFoundError } from '@/domain/error'
import { RequiredFieldError } from '@/application/errors'

jest.mock('@/infra/gateways/zipcode-api')

describe('Address routes', () => {
  let token: string
  const { email, password, id, name } = accountParams
  const { zipCode, neighborhood, street, complement, number, surname, active } = addressParams

  const searchSpy: jest.Mock = jest.fn()

  jest.mocked(ZipCodeApi).mockImplementation(jest.fn().mockImplementation(() => ({ search: searchSpy })))

  beforeAll(async () => {
    token = sign({ key: id }, env.secret)
    searchSpy.mockReturnValue({ neighborhood, street })
  })

  beforeEach(async () => {
    await prisma.user.create({ data: { id, name, email, password, role: 'admin' } })
  })

  describe('GET /address', () => {
    it('should return 200 on success', async () => {
      const { status, body } = await request(app)
        .get('/address')
        .set({ authorization: `Bearer: ${token}` })
        .send({ zipCode })

      expect(status).toBe(200)
      expect(body).toEqual({ neighborhood, street })
    })

    it('should return 400 if zipCode not exists', async () => {
      searchSpy.mockReturnValueOnce(undefined)
      const { status, body: { error } } = await request(app)
        .get('/address')
        .set({ authorization: `Bearer: ${token}` })
        .send({ zipCode })

      expect(status).toBe(400)
      expect(error).toBe(new FieldNotFoundError('zipCode').message)
    })
  })

  describe('POST /address', () => {
    it('should return 400 if zipCode not exists', async () => {
      searchSpy.mockReturnValueOnce(undefined)
      const { status, body: { error } } = await request(app)
        .post('/address')
        .set({ authorization: `Bearer: ${token}` })
        .send({ zipCode, neighborhood, street, complement, number, surname })

      expect(status).toBe(400)
      expect(error).toBe(new FieldNotFoundError('zipCode').message)
    })

    it('should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .post('/address')
        .set({ authorization: `Bearer: ${token}` })
        .send({ zipCode, neighborhood, street, complement, number })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('surname').message)
    })

    it('should return 200 on success', async () => {
      const { status, body } = await request(app)
        .post('/address')
        .set({ authorization: `Bearer: ${token}` })
        .send({ zipCode, neighborhood, street, complement, number, surname })

      expect(status).toBe(200)
      expect(body).toMatchObject({ zipCode, neighborhood, street, complement, number, surname })
    })
  })

  describe('GET /addresses', () => {
    it('should return 200 on success', async () => {
      await prisma.address.create({ data: { zipCode, neighborhood, street, complement, number, surname, user_id: id, active } })
      const { status, body } = await request(app)
        .get('/addresses')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toMatchObject([{ zipCode, neighborhood, street, complement, number, surname, accountId: id }])
    })
  })

  describe('DELETE /address/:id', () => {
    it('should return 400 if id not exists', async () => {
      searchSpy.mockReturnValueOnce(undefined)
      const { status, body: { error } } = await request(app)
        .delete(`/address/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new FieldNotFoundError('id').message)
    })

    it('should return 204 on success', async () => {
      await prisma.address.create({ data: { id, zipCode, neighborhood, street, complement, number, surname, user_id: id, active } })
      const { status } = await request(app)
        .delete(`/address/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
    })
  })

  describe('PUT /address', () => {
    it('should return 400 if id not exists', async () => {
      searchSpy.mockReturnValueOnce(undefined)
      const { status, body: { error } } = await request(app)
        .put('/address')
        .set({ authorization: `Bearer: ${token}` })
        .send({ id })

      expect(status).toBe(400)
      expect(error).toBe(new FieldNotFoundError('id').message)
    })

    it('should return 204 on success', async () => {
      await prisma.address.create({ data: { id, zipCode, neighborhood, street, complement, number, surname, user_id: id, active } })
      const { status } = await request(app)
        .delete(`/address/${id}`)
        .set({ authorization: `Bearer: ${token}` })
        .send({ id, number: 16 })

      expect(status).toBe(204)
    })
  })
})
