import { Decimal } from '@prisma/client/runtime'

type ProductInput = {
  id: string
  name: string
  description: string
  price: Decimal
  available: boolean
  picture: string | null
  category_id: string
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
export const PrismaoHelper = {
  async productMap ({ available, category_id: categoryId, description, id, name, picture, price }: ProductInput): Promise<ProductOutput> {
    return {
      id,
      name,
      categoryId,
      price: Number(price),
      picture: picture ?? undefined,
      available,
      description
    }
  }
}
