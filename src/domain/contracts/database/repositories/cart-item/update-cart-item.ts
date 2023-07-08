export interface UpdateCartItemRepository {
  update: (input: UpdateCartItemRepository.Input) => Promise<UpdateCartItemRepository.Output>
}

export namespace UpdateCartItemRepository {
  export type Input = { cartId: string, productId: string, quantity: number }

  export type Output = { id: string, cartId: string, productId: string, quantity: number }
}
