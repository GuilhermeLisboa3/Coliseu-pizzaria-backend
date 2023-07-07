import { Decimal } from '@prisma/client/runtime'

type ProductInput = {
  id: string
  name: string
  description: string
  price: Decimal
  available: boolean
  picture: string | null
  categoryId: string
}

type ProductOutput = {
  id: string
  name: string
  description: string
  price: number
  available: boolean
  picture: string | undefined
  categoryId: string
}

type AddressInput = {
  id: string
  userId: string
  surname: string
  zipCode: string
  neighborhood: string
  street: string
  number: number
  complement: string | null
  active: boolean
}

type AddressOutput = {
  id: string
  accountId: string
  surname: string
  zipCode: string
  neighborhood: string
  street: string
  number: number
  complement?: string
  active: boolean
}

export const PrismaHelper = {
  productMap ({ available, categoryId, description, id, name, picture, price }: ProductInput): ProductOutput {
    return {
      id,
      name,
      categoryId,
      price: Number(price),
      picture: picture ?? undefined,
      available,
      description
    }
  },

  addressMap ({ userId: accountId, complement, ...input }: AddressInput): AddressOutput {
    return { accountId, complement: complement ?? undefined, ...input }
  }
}
