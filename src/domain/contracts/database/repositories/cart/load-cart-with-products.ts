export interface LoadCartWithProductsRepository {
  loadWithProducts: (input: LoadCartWithProductsRepository.Input) => Promise<LoadCartWithProductsRepository.Output>
}

export namespace LoadCartWithProductsRepository {
  export type Input = { accountId: string }

  export type Output = {
    id: string
    accountId: string
    products: Array<{ id: string, categoryId: string, name: string, description: string, price: number, available: boolean, picture?: string, quantity: number, categoryName: string }>
  } | null
}
