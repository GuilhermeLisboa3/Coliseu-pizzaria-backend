export interface LoadCartItemRepository {
  load: (input: LoadCartItemRepository.Input) => Promise<LoadCartItemRepository.Output>
}

export namespace LoadCartItemRepository {
  export type Input = { cartId: string, productId: string }

  export type Output = { id: string, cartId: string, productId: string, quantity: number } | null
}
