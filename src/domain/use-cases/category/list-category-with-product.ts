type Output = {
  id: string
  name: string
  products: Array<{ id: string, categoryId: string, name: string, description: string, price: number, available: boolean, picture?: string }>
}
export type ListCategoryWithProduct = () => Promise<Output>
