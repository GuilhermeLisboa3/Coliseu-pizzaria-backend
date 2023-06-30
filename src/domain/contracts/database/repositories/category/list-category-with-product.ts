export interface ListCategoryWithProductRepository {
  list: () => Promise<ListCategoryWithProductRepository.Output>
}

export namespace ListCategoryWithProductRepository {
  export type Output = Array<{
    id: string
    name: string
    products: Array<{ id: string, categoryId: string, name: string, description: string, price: number, available: boolean, picture?: string }>
  }>
}
