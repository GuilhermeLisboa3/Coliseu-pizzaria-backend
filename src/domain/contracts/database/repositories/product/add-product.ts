export interface AddProductRepository {
  create: (input: AddProductRepository.Input) => Promise<AddProductRepository.Output>
}

export namespace AddProductRepository {
  export type Input = {
    categoryId: string
    name: string
    description: string
    price: number
    picture?: string
  }
  export type Output = void
}
