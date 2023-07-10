type Input = { accountId: string }

type Output = {
  id: string
  accountId: string
  products: Array<{ id: string, categoryId: string, name: string, description: string, price: number, available: boolean, picture?: string, quantity: number }>
} | null
export type LoadCartWithProducts = (input: Input) => Promise<Output>
